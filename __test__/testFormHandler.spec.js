/**
 * @jest-environment jsdom 
 */

import { handleSubmit, showResult, postdata } from "../src/client/js/formHandler"
//  function createDOM() { 
//    const dom = new JSDOM(''); 
//    global.document = dom.document; 
//    global.window = dom.window; 
  
//    Object.keys(dom.window).forEach(property => { 
//      if (typeof global[property] === 'undefined') { 
//        global[property] = dom.window[property]; 
//      } 
//    }); 
  
//    global.navigator = { 
//      userAgent: 'node.js', 
//    }; 
  
//    KEYS.forEach(key => { 
//      global[key] = window[key]; 
//    }); 
//  }
// test('the data is Positive', async () => {
//   const serverURL = 'http://localhost:8000/api'
//   const blog_url = "https://spring.developpez.com/actu/347409/Sortie-de-Spring-Framework-6-1-avec-une-compatibilite-amelioree-avec-Virtual-Threads-et-JDK-21/";
//           let data = {
//         url: blog_url
//     }
//   const output = await handleSubmit(serverURL, data);
//   expect(output.score_tag).toBe('Positive');
// });
const mockUpObject = {
  focus: () => null,
};

global.document.getElementById = jest.fn(() => mockUpObject);

test('the data is Positive', () => {
  const data =[ {
      score_tag: "P"
    }]
    const output = "Positive";
    expect(showResult(data[0])).toEqual(output);
})
