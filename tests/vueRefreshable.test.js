import { createLocalVue, shallowMount } from '@vue/test-utils';
import Refreshable from '@/main';
import FormComponent from './FormComponent';

describe('Refreshable', () => {
  let wrapper;
  let mockStorage;

  /**
     * @param {Object} options
     * @param {Object} props
     * @return {Wrapper}
     */
  const createInstance = (options = {}, props = {}) => {
    const localVue = createLocalVue();

    localVue.use(Refreshable, { storage: mockStorage, ...options });

    return shallowMount(FormComponent, {
      localVue,
      propsData: props,
    });
  };

  /**
     * @param {String} selector
     * @param {String} value
     */
  const assertInputEquals = (selector, value) => {
    const input = wrapper.find(selector).element.value;
    expect(input).toBe(value);
  };

  beforeAll(() => {
    mockStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  beforeEach(() => {
    wrapper = createInstance({
      delay: 1
    });
  });

  afterEach(() => {
    Object.keys(mockStorage).forEach((method) => {
      mockStorage[method].mockReset();
    });
  });

  it('loads the stored state into the chosen data key', () => {
    expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
    expect(mockStorage.getItem).toHaveBeenCalledWith('vue-refreshable-state');
  });

  it('sets the initial data from storage', async () => {
    mockStorage.getItem = jest.fn(() => JSON.stringify({
      name: 'Foo Bar',
      email: 'foo@bar.com',
    }));

    wrapper = createInstance();

    await wrapper.vm.$nextTick();

    assertInputEquals('input[type="text"]', 'Foo Bar');
    assertInputEquals('input[type="email"]', 'foo@bar.com');
  });

  it('should handle restoring invalid JSON data', async () => {
    mockStorage.getItem = jest.fn(() => 'invalid data');

    wrapper = createInstance({}, {
      'data-name': 'John Doe',
      'data-email': 'john@doe.com',
    });

    assertInputEquals('input[type="text"]', 'John Doe');
    assertInputEquals('input[type="email"]', 'john@doe.com');

    await wrapper.vm.$nextTick();

    assertInputEquals('input[type="text"]', 'John Doe');
    assertInputEquals('input[type="email"]', 'john@doe.com');
  });

  it('loads the stored data using a custom key', () => {
    mockStorage.getItem.mockReset();

    createInstance({ key: 'custom-key' });

    expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
    expect(mockStorage.getItem).toHaveBeenCalledWith('custom-key');
  });

  it('stores the current state to localStorage on change', async (done) => {
    const expected = JSON.stringify({ name: 'John Doe' });

    expect(mockStorage.setItem).not.toHaveBeenCalled();

    const nameInput = wrapper.find('input[type="text"]');
    await nameInput.setValue('John Doe');

    setTimeout(() => {
      assertInputEquals('input[type="text"]', 'John Doe');

      expect(mockStorage.setItem).toHaveBeenCalledTimes(1);
      expect(mockStorage.setItem).toHaveBeenCalledWith('vue-refreshable-state', expected);

      done();
    }, 1);
  });

  it('clears the storage when the component is unmounted', () => {
    expect(mockStorage.removeItem).not.toHaveBeenCalled();

    wrapper.destroy();

    expect(mockStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(mockStorage.removeItem).toHaveBeenCalledWith('vue-refreshable-state');
  });

  it('does not store password fields', async (done) => {
    expect(mockStorage.setItem).not.toHaveBeenCalled();

    const nameInput = wrapper.find('input[type="password"]');
    await nameInput.setValue('secret');

    setTimeout(() => {
      expect(mockStorage.setItem).toHaveBeenCalledTimes(1);
      expect('password' in JSON.parse(mockStorage.setItem.mock.calls[0][1])).toBe(false);

      done();
    }, 1);
  });
});
