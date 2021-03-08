// pc용 intro
$(document).ready(function () {
  // .move 좌에서 우로 애니메이트 => .animate()
  $('#pcIntro .move').animate(
    { right: 0 },
    6000,
    'easeInOutSine',
    function () {
      $('#pcIntro .pc_gradient_bg').animate(
        { opacity: 1 },
        2000,
        'easeInOutSine'
      );
      $('#loadNum').parent().text('ON');
    }
  );
  // pc,m 공통
  // light 크기 커지기
  $('.intro .light').animate(
    { width: 400, height: 400 },
    5000,
    'easeInOutSine'
  );
  // 전구 빛 차오르기
  var tgHei = $('#loadingBox .icon').height();
  // console.log(tgHei);
  $('#loadingBox .icon .num').animate({height:tgHei},6000,'easeInOutSine');
});

// mobile용 intro
$(document).ready(function () {
  // .move 상에서 하로 애니메이트 => .animate()
  $('#mIntro .move').animate(
    { bottom: '26%' },
    6000,
    'easeInOutSine',
    function () {
      $('#loadNum').parent().text('ON');
    }
  );
});

// pc,m 공통
// 애니메이트 !!시간 동안!! 0~100 1++ #loadNum 텍스트교체 => .setInterval() & .text()
var loadNum = 0;
var loading = setInterval(function () {
  loadNum++;
  $(' #loadNum').text(loadNum);
  if (loadNum === 100) clearInterval(loading);
}, 58);