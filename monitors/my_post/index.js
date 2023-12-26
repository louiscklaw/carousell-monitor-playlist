var fs = require('fs');
var expect = require('chai').expect;

var search_result = fs.readFileSync('../carousell-search-scrape/results/carousell_search_result.json', {
  encoding: 'utf-8',
});
var search_result_json = JSON.parse(search_result);
var { result } = search_result_json;
var { search_using_vba, search_using_coding, search_using_programming, search_using_python, search_using_javascript } = result;

function testMain(list_under_test) {
  var vba_post_check = 'FAILED';

  for (var i = 0; i < 24; i++) {
    // console.log(search_using_vba[i].seller_name);
    if (list_under_test[i].seller_name.search(/cklaw/) > -1) {
      vba_post_check = 'OK';
      break;
    }

    if (list_under_test[i].seller_name.search(/ckwong/) > -1) {
      vba_post_check = 'OK';
      break;
    }
  }
  return vba_post_check;
}

(() => {
  var output = { state: 'init', debug: {}, error: {}, result: { last_update: new Date().toISOString() } };
  var vba_post_check = testMain(search_using_vba);
  var coding_post_check = testMain(search_using_coding);
  var coding_post_check = testMain(search_using_coding);
  var programming_post_check = testMain(search_using_programming);
  var javascript_post_check = testMain(search_using_javascript);
  var python_post_check = testMain(search_using_python);
  var tableau_post_check = testMain(search_using_tableau);
  var wordpress_post_check = testMain(search_using_wordpress);

  try {
    output.result['vba_post_check'] = vba_post_check;
    output.result['coding_post_check'] = coding_post_check;
    output.result['programming_post_check'] = programming_post_check;
    output.result['javascript_post_check'] = javascript_post_check;
    output.result['wordpress_post_check'] = wordpress_post_check;
    output.result['tableau_post_check'] = tableau_post_check;
    output.result['python_post_check'] = python_post_check;
  } catch (error) {
    output = { ...output };
  }
  fs.writeFileSync('./results/post_test_result.json', JSON.stringify(output, null, 2), { encoding: 'utf-8' });
})();
