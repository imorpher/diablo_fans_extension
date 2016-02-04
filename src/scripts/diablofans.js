$(document).ready(function(){
   var itemObjects = [];
   
   $('.item-equip li [data-item-id]').each(function(){
     itemObjects.push({
        'id' : $(this).attr('data-item-id'),
        'name' : $(this)[0].innerText,
        'object' : $(this)[0]
     });
     
     $(this).click(function(){
         if(!$(this).hasClass('item-owned')){
             $(this).addClass('item-owned');
         }
         else{
             $(this).removeClass('item-owned');
         }
     });
   });
   
   
   
//    
//    itemObjects.forEach(function(item){
//       console.log(item);
//       console.log(item.object.addClass('item-owned'));//.push('item-owned');
//    });
   
   
   
   
   
   
   
   
//    $('#item-head .class-selected').each(function(){
//        console.log($(this).attr('data-item-id')); 
//        alert($(this).attr('data-item-id'));
//     //   items.push(
//     //       {
//     //           id : $(this).attr('data-item-id'),
//     //           name : $(this).$('a').text()
//     //       }
//     //   )  
//    });
    
});