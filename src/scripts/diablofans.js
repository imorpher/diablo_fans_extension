(function(){
        
    $(document).ready(function(){
        var itemsSelector = '.item-selection [data-item-id],[data-cube-stat-selected]';
            //gemSelector = '#item-gem [data-item-id]';
        
        itemsOwned.getAll();
        
        $(itemsSelector ).click(function(){
            itemClicked($(this));
        });
    });
    
    var itemClicked = function(jqueryObject){
        if(!jqueryObject.hasClass('item-owned')){
            jqueryObject.addClass('item-owned');
            itemsOwned.add(jqueryObject.attr('data-item-id'));
        }
        else{
            jqueryObject.removeClass('item-owned');
            itemsOwned.remove(jqueryObject.attr('data-item-id'));
        }
    };
    
    var loadOwnedItems = function(items){
        items.forEach(function(io){
            $('.item-selection [data-item-id='+io+']').addClass('item-owned');
            
        });
    };
    
    var cubesOwned = {
        items : [],
        
        getAll : function(){
            
        },
        
        add : function(itemId){
            
        },
        
        remove : function(itemId){
            
        }
    };
    
    var localStorage = {
        getAll : function(key){
            return new Promise(function(resolve, reject){
                var searchFilter = {};                
                searchFilter[key] = undefined;
                
                chrome.storage.local.get(key, function(result){                       
                    if(result === undefined){
                        searchFilter[key] = [];
                                                
                        chrome.storage.local.set(searchFilter, function(){
                            resolve([]); 
                        });
                    }
                    else{                
                        resolve(result[key]); 
                    }
                });
            });
        },
            
        add : function(key, itemId){
            return new Promise(function(resolve, reject){
                
                var searchFilter = {};                
                searchFilter[key] = undefined;
                
                chrome.storage.local.get(searchFilter, function(result){   
                    
                    if(result === undefined)
                        reject();
                             
                    searchFilter[key] = result[key].push(itemId);
                    
                    chrome.storage.local.set(searchFilter, function(){
                        resolve(result[key]);
                    });
                });
            });
        },
        remove : function(key, itemId){
            return new Promise(function(resolve, reject){
                var searchFilter = {};                
                searchFilter[key] = undefined;
                
                chrome.storage.local.get(searchFilter, function(result){
                    if(result === undefined)
                        reject();
                    
                    searchFilter[key] = result[key].splice(result[key].indexOf(itemId), 1);

                    chrome.storage.local.set(searchFilter, function(){
                        resolve(result[key]);
                    });
                }); 
            });
        }
    };
    
    var itemsOwned = {
        items : [],
        
        key : 'itemsOwned',
        
        getAll : function(){
            localStorage.getAll(itemsOwned.key).then(function(result){
                itemsOwned.items = result; 
                loadOwnedItems(itemsOwned.items);
            });
        },
        
        add : function(itemId){
            localStorage.add(itemsOwned.key, itemId).then(function(result){
                itemsOwned.items = result;
            });
        },
        
        remove : function(itemId){
            localStorage.remove(itemsOwned.key, itemId).then(function(result){
                itemsOwned.items = result;
            });
        }
    };
    
    
})();  