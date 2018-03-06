##	jinang/Progress

```javascript
const Progress = require('jinang/Progress');

const progress = new Progress();

// Progress inherits class events.EventEmitter.
progress.on('error', function(ex) {
    // ...
});
progress.emit('error', ex);

// Progress may send/change its signal via homonymous methods.
progress.on('signal', function(signal) {
    // ...
});
progress.abort();
```

*   class __Progress__
*   number __Progress.SIGABRT__
*   number __Progress.SIGHUP__
*   number __Progress.SIGINT__
*   number __Progress.SIGKILL__
*   number __Progress.SIGQUIT__
*   number __Progress.SIGTERM__

*   void __\<instance\>.raise__(number *signal* )
*   void __\<instance\>.signal__(number *signal*, Function *catcher*)

*   void __\<instance\>.abort__()  
    Send signal SIGABRT to progress and emit a *signal* event.
*   void __\<instance\>.hangup__()  
    Send signal SIGHUP to progress and emit a *signal* event.
*   void __\<instance\>.interrupt__()  
    Send signal SIGINT to progress and emit a *signal* event.
*   void __\<instance\>.kill__()  
    Send signal SIGKILL to progress and emit a *signal* event.
*   void __\<instance\>.quit__()  
    Send signal SIGQUIT to progress and emit a *signal* event.
*   void __\<instance\>.terminate__()  
    Send signal SIGTERM to progress and emit a *signal* event.
