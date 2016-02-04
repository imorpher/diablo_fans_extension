(function(){
    
    var itemsOwned = [];
    
    $(document).ready(function(){
        var itemObjects = [];
        
        getItems();
        
        $('.item-equip li [data-item-id]').click(function(){
            if(!$(this).hasClass('item-owned')){
                $(this).addClass('item-owned');
                saveItem($(this).attr('data-item-id'));
            }
            else{
                $(this).removeClass('item-owned');
                removeItem($(this).attr('data-item-id'));
            }
        });
        
        
        // $('.item-equip li [data-item-id]').each(function(){
        //     itemObjects.push({
        //         'id' : $(this).attr('data-item-id'),
        //         'name' : $(this)[0].innerText,
        //         'object' : $(this)[0]
        //     });
        //     
        //     if(localStorage.itemsOwned.indexOf($(this).attr('data-item-id')) > -1)
        //         $(this).addClass('item-owned');
        //     
        //     $(this).click(function(){
        //         if(!$(this).hasClass('item-owned')){
        //             $(this).addClass('item-owned');
        //             saveItem($(this).attr('data-item-id'));
        //         }
        //         else{
        //             $(this).removeClass('item-owned');
        //             removeItem($(this).attr('data-item-id'));
        //         }
        //     });
        // });
    });
    
    var loadOwnedItems = function(itemsOwned){
        itemsOwned.forEach(function(io){
            $('.item-equip li [data-item-id='+io+']').addClass('item-owned');
        });
    };
    
    var getItems = function(){
        chrome.storage.local.get('itemsOwned', function(result){
                        
            if(! ('itemsOwned' in result)){
                chrome.storage.local.set({'itemsOwned' : []}, function(){
                    itemsOwned = []; 
                    loadOwnedItems(itemsOwned);
                });
            }
            else{                
                itemsOwned = result.itemsOwned; 
                loadOwnedItems(itemsOwned);
            }
        });
    };
    
    var saveItem = function(itemId){
        chrome.storage.local.get('itemsOwned', function(result){            
            result.itemsOwned.push(itemId);
            chrome.storage.local.set({'itemsOwned' : result.itemsOwned}, function(){
                itemsOwned=result.itemsOwned;
            });
        });
    };
    
    var removeItem = function(itemId){
        chrome.storage.local.get('itemsOwned', function(result){
            result.itemsOwned.splice(result.itemsOwned.indexOf(itemId), 1);
            chrome.storage.local.set({'itemsOwned' : result.itemsOwned}, function(){
                itemsOwned=result.itemsOwned;
            });
        });
    };
})();  