const  postmanCrudJsonTemp =(modelname)=> {
    let routeName=modelname;
     let obj={
         name:modelname,
         item:[
             {
                 "name": "getAll",
                 "request": {
                     "method": "GET",
                     "header": [
                         {
                             "key": "Authorization",
                             "value": "{{token}}",
                             "type": "text"
                         }
                     ],
                     "url": {
                         "raw": `{{host}}/${routeName}/list/all`,
                         "host": [
                             "{{host}}"
                         ],
                         "path": [
                             routeName,
                             "list","all"
                         ]
                     }
                 },
                 "response": []
             },
             {
                 "name": "pagenation",
                 "request": {
                     "method": "GET",
                     "header": [
                         {
                             "key": "Authorization",
                             "value": "{{token}}",
                             "type": "text"
                         }
                     ],
                     "url": {
                         "raw": `{{host}}/${routeName}/list/page`,
                         "host": [
                             "{{host}}"
                         ],
                         "path": [
                             routeName,"list",
                             "page"
                         ]
                     }
                 },
                 "response": []
             },
             {
                 "name": "Create",
                 "request": {
                     "method": "POST",
                     "header": [
                         {
                             "key": "Content-Type",
                             "value": "application/json",
                             "type": "text"
                         },
                         {
                             "key": "Authorization",
                             "value":"{{token}}",
                             "type": "text"
                         }
                     ],
                     "body": {
                         "mode": "raw",
                         "raw": "{\"id\": \"1\"}"
                     },
                     "url": {
                         "raw": `{{host}}/${routeName}`,
                         "host": [
                             "{{host}}"
                         ],
                         "path": [
                             routeName,
                     
                         ]
                     }
                 },
                 "response": []
             },
             {
                 "name": "getById",
                 "request": {
                     "method": "GET",
                     "header": [
                         {
                             "key": "Authorization",
                             "value": "{{token}}",
                             "type": "text"
                         }
                     ],
                     "url": {
                         "raw": `{{host}}/${routeName}/1`,
                         "host": [
                             "{{host}}"
                         ],
                         "path": [
                             routeName,
                             1
                         ]
                     }
                 },
                 "response": []
             },
             {
                 "name": "update",
                 "request": {
                     "method": "PUT",
                     "header": [
                         {
                             "key": "Content-Type",
                             "value": "application/json",
                             "type": "text"
                         },
                         {
                             "key": "Authorization",
                             "value":"{{token}}",
                             "type": "text"
                         }
                     ],
                     "body": {
                         "mode": "raw",
                         "raw": "{\"id\": \"1\"}"
                     },
                     "url": {
                         "raw": `{{host}}/${routeName}/1`,
                         "host": [
                             "{{host}}"
                         ],
                         "path": [
                             routeName,1
                     
                         ]
                     }
                 },
                 "response": []
             },
             {
                 "name": "delete",
                 "request": {
                     "method": "DELETE",
                     "header": [
                         {
                             "key": "Authorization",
                             "value": "{{token}}",
                             "type": "text"
                         }
                     ],
                     "url": {
                         "raw": `{{host}}/${routeName}/1`,
                         "host": [
                             "{{host}}"
                         ],
                         "path": [
                             routeName,
                             1
                         ]
                     }
                 },
                 "response": []
             },
         ]
     }
     
     return obj;
 }
 
   module.exports=postmanCrudJsonTemp