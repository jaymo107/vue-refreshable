import { createLocalVue, shallowMount } from '@vue/test-utils';
import Refreshable from '@/vueRefreshable';
import FormComponent from './FormComponent';

describe('Refreshable', () => {
    let wrapper;
    let mockStorage;

    beforeAll(() => {
        mockStorage = {
            getItem: jest.fn(() => null),
            setItem: jest.fn(),
            removeItem: jest.fn(),
        };
    });

    beforeEach(() => {
        const localVue = createLocalVue();

        localVue.use(Refreshable, {
            storage: mockStorage
        });

        wrapper = shallowMount(FormComponent, {
            localVue
        });
    });

    afterEach(() => {
        Object.keys(mockStorage).forEach(method => {
            mockStorage[method].mockReset();
        });
    });

    it('loads the stored state into the chosen data key', () => {
        expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.getItem).toHaveBeenCalledWith('vue-refreshable-state');
    });

    it('stores the current state to localStorage on change', async () => {
        const expected = JSON.stringify({ name: 'John Doe', email: '' });

        expect(mockStorage.setItem).not.toHaveBeenCalled();

        const input = wrapper.find('input[type="text"]');
        await input.setValue('John Doe');
        
        expect(mockStorage.setItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.setItem).toHaveBeenCalledWith('vue-refreshable-state', expected);
    });

    it('clears the storage when the component is unmounted', () => {
        expect(mockStorage.removeItem).not.toHaveBeenCalled();

        wrapper.destroy();

        expect(mockStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.removeItem).toHaveBeenCalledWith('vue-refreshable-state');
    });
});
