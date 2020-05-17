const { ReduxEvents } = require('../src/redux-events-middleware');

const create = () => {
  const event = new ReduxEvents();
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }

  const next = jest.fn();

  const invoke = action => event.createReduxMiddleware({})(store)(next)(action);

  return { event, store, next, invoke };
}

describe('Redux event middleware', () => {
  it('executes action from main dispatch', () => {
    const { next, invoke } = create();
    const action = { type: 'FETCH_TODOS' };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it('calls listener after subscribing', () => {
    const { event, invoke } = create();
    const handleCreate = jest.fn(() => () => {});
    const handleFetch = jest.fn(() => () => {});

    event.registerListener([{
      type: 'FETCH_TODO',
      handler: handleFetch
    }]);

    event.registerListener([{
      type: 'CREATE_TODO',
      handler: handleCreate
    }]);

    // Long time after, in a galaxy far far away
    event.registerListener({
      type: 'CREATE_TODO',
      handler: handleCreate
    });
    

    invoke({ type: 'FETCH_TODO' });
    
    expect(handleFetch.mock.calls.length).toBe(1);

    invoke({ type: 'CREATE_TODO' });

    expect(handleCreate.mock.calls.length).toBe(2);
  });

  it('stops calling listeners after removed from main object', () => {
    const { event, invoke } = create();
    const handler = jest.fn(() => () => {});
    
    const unsubscribe = event.registerListener({
      type: 'CREATE_TODO',
      handler,
    });

    invoke({ type: 'CREATE_TODO' });

    unsubscribe();

    invoke({ type: 'CREATE_TODO' });

    expect(handler.mock.calls.length).toBe(1);
  });
})