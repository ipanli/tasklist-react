'use strict';

const host = '';
//const host = 'http://api.panli.com';

export function apiTopic() {
//   let args = [].slice.call(arguments),
//       str = args.shift();
//   return str.replace(/{(\d+)}/g, function(match, number) {
//     return args[number] !== undefined
//       ? args[number]
//       : match;
//   });
    let url = host + '/ShoppingGuideAPI/GetTopicItems?pageSize=50&id='
    
    return url;
}


