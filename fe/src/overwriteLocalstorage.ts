export const overwriteLocalstorageMethodsToDetectStorageChanges = () => {
    const { setItem, removeItem } = localStorage.__proto__;
    
    localStorage.setItem = function(key, value) {
      const event:any = new Event('localUpdated');
            event.key = key; 
            event.value = value; 
      
      window.dispatchEvent(event);
      setItem.call(this, key, value);
    };
    
    localStorage.removeItem = function(key) {
      const event:any = new Event('localUpdated');
            event.key = key; 
      
      window.dispatchEvent(event);
      removeItem.call(this, key);
    };
}