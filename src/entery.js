import css from './css/index.css';
import less from './css/index.less';
// import $ from 'jquery';
{
    let str = "Hello Webpack!!!!！";
    document.getElementById('title').innerHTML = str;
}

$('#title').on('click',function(){
    $(this).html('Hello jquery!!!');
});
   
