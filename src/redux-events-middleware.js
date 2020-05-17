const shortid = require('shortid');
/*
    eslint
        import/prefer-default-export: off
*/

// const EventEmitter = require('events');

// import logger from '@marcopeg/utils/lib/logger'

class ReduxEvents {
    constructor () {
        this.listeners = {};
    }

    registerListener (listener) {
        const registered = [];

        if (Array.isArray(listener)) {
            this.listeners = listener.reduce((acum, current) => {
                const id = shortid.generate();

                registered.push({ id, type: current.type });

                return {
                    ...acum,
                    [current.type]: {
                        ...acum?.[current.type],
                        [id]: current
                    }
                }
            }, {...this.listeners});
        } else {
            const id = shortid.generate();

            registered.push({ id, type: listener.type });

            this.listeners = {
                ...this.listeners,
                [listener.type]: {
                    ...this.listeners?.[listener.type],
                    [id]: listener,
                }
            }
        }
        
        return () => this._removeListener(registered);
    }

    createReduxMiddleware (ctx) {
        return store => next => (action) => {
            // console.log(`EVENT: ${action.type}`)
            // console.log(listeners)
            if (!this.listeners.hasOwnProperty(action.type))
              return next(action);

            const listeners = this.listeners[action.type];

            Object.keys(listeners).forEach(key => {
                if (Array.isArray(listeners[key])) {
                    listeners[key].forEach(listener => {
                      try {
                          if (listener[key].async) {
                              setTimeout(() => listener.handler(action, ctx)(store.dispatch, store.getState))
                          } else {
                              listener[key].handler(action, ctx)(store.dispatch, store.getState)
                          }
                      } catch (e) {
                          // eslint-disable-next-line
                          console.error('Redux event handler error')
                      }
                    });
                } else {
                    try {
                        if (listeners[key].async) {
                            setTimeout(() => listeners[key].handler(action, ctx)(store.dispatch, store.getState))
                        } else {
                            listeners[key].handler(action, ctx)(store.dispatch, store.getState)
                        }
                    } catch (e) {
                        // eslint-disable-next-line
                        console.error('Redux event handler error')
                    }
                }
            })
      
            return next(action)
        }
    }

    _removeListener (registered) {
      registered.forEach(listener => {
          if (!this.listeners.hasOwnProperty(listener.type))
              return;

          if (!this.listeners[listener.type].hasOwnProperty(listener.id))
              return;

          const { [listener.id]: removed, ...rest } = this.listeners[listener.type];
          
          this.listeners = {
              ...this.listeners,
              [listener.type]: {
                  ...rest,
              }
          }
      })
    }

}

module.exports = {
    ReduxEvents,
}
