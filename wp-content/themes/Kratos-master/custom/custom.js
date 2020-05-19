;
// 请在第三行开始编写代码
$(function () {
  $(document).pjax('a', 'body', { fragment: 'body' });
  $(document).on('pjax:send', function () {
    NProgress.start();
  })
  $(document).on('pjax:complete', function () {
    NProgress.done();

    loadThemeJs()
    if (typeof Prism !== 'undefined') {
      // 代码高亮
      Prism.highlightAll();
    }
  })

  $.ajaxSetup({
    cache: true
  });
  getThemeJsSrc();
  function getThemeJsSrc () {
    // 获取本站 kratos.min.js 文件地址
    if (!$.kratosjs) {
      $('script').each(function () {
        var src = $(this).attr('src') || ''
        if (src.indexOf( 'kratos.min.js' ) >= 0) {
          $.kratosjs = src
          return false;
        }
      })
    }
  }
  function loadThemeJs () {
    var url = $.kratosjs || 'https://n3.cdn.vtrois.com/kratos/3.0.9/assets/js/kratos.min.js'
    $.getScript( url ).done(function( script, textStatus ) {
      console.log( textStatus );
    });
  }
})