$(document).ready(function(){

  /* 메인 레이아웃 수평아코디언 제어 */ 
  // 1)초기설정
  // -아코디언헤더 첫번째에 클래스 .on 부여하기(배경,글자 색 변경), aria-expended:true, aria-disabled:true 접근성주기, 포커스부여하기
  // -첫번째 아코디언 패널 보이기 display:block; width:값;
  var accordionH = $('#main h2.tit');
  var winWid;
  var titWid;
  var panelWid;

  $(window).on('resize', function () {
    winWid = $(this).width();
    titWid = accordionH.outerWidth()*5;
    panelWid = winWid-titWid;
    // console.log(winWid,titWid, panelWid);

    // 열려진 상세 내용 업데이트
    $('.tit.on + .a_panel').css('width', panelWid);
  });
  $(window).trigger('resize');

  // 로딩시 한번 적용
  accordionH.first().addClass('on').attr({'aria-expanded':true, 'aria-disabled':true});
  $('#aP1').css({display: 'block', width: panelWid}).attr('tabIndex',0);

  // 2)키보드제어 -이전키, 다음키, home, end
  // -이전키 누를때 첫번째 아코디언헤더 이면 마지막 아코디언으로 포커스 보내기, 다음키 누를때 마지막 아코디언헤더이면 첫번째 아코디언헤더로 포커스 보내기
  // -home 누르면 첫번째 아코디언헤더로. end 누르면 마지막 아코디언헤더로. 기본기능제어
  accordionH.children().on('keydown',function(evt){
    var key = evt.keyCode;
    // console.log(key); //37,39,36,35
    switch (key) {
      case 37:
        // 처음 아코디언헤더이면 .last 클래스 버튼에 포커스
        if($(this).hasClass('first')) {
          $(this).closest('#main').find('.last').focus();
        } else {
          $(this).parent().prev().prev().children().focus();
        }
        break;
      case 39:
        // 마지막 아코디언헤더이면 .first 클래스 버튼에 포커스
        if($(this).hasClass('last')) {
          $(this).closest('#main').find('.first').focus();
        } else {
          $(this).parent().next().next().children().focus();
        }
        break;
      case 36:
        // 홈 키
        evt.preventDefault();
        $(this).closest('#main').find('.first').focus();
        break;
      case 35:
        // 엔드키
        evt.preventDefault();
        $(this).closest('#main').find('.last').focus(); 
        break;
    }
  });
  
  // 3)마우스제어 -아코디언헤더를 클릭하면 동작
  // -아코디언 헤더가 .on을 가지고 있지 않다면 .on 부여하기(배경 글자 색 변경), aria-expended:true, aria-disabled:true 접근성주기, 포커스부여하기, 나 외에 아코디언헤더들에게 .on지우고, 접근성 aria-expended:false; aria-disabled 삭제 
  // -헤더 짝꿍 아코디언 패널 보이기. display:block; width:값; 외에 아코디언패널 숨기기 
  accordionH.on('click',function() {
    // console.log(panelWid);
    if(!$(this).hasClass('on')) {
      $(this).addClass('on').attr({'aria-expanded':true, 'aria-disabled':true}).siblings('.tit').removeClass('on').attr({'aria-expanded':false}).removeAttr('aria-disabled');
      
      $(this).next().css('display','block').stop().animate({width : panelWid},1000).attr('tabIndex',0).siblings('.a_panel').stop().animate({width : 0},1000,function () {
        $(this).css('display','none').attr('tabIndex', -1);
      });
    } 
  });

  /* 마우스 버튼, a, .tg 에서 커서모양 바뀌기 */
  $(':button, a, .tg').on({  //.tg=>토글
    'mouseenter focusin': function () {
      $('#svg1')
        .stop()
        .animate({ width:120, height:120 }, 400)
        .children()
        .attr('fill','transparent')
        .stop()
        .animate({ cx:60, cy:60, r:54, }, 400);
    },
    'mouseleave focusout': function () {
      $('#svg1')
        .stop()
        .animate({ width:28, height:28 }, 400)
        .children()
        .attr('fill','#ff4500')
        .stop()
        .animate({cx:14, cy:14, r:12, }, 400);              
    },
  });

  /* !!마우스가 움직일때!! 마우스 따라다니는 효과 */
  $(this).on('mousemove', function (evt) {
    // cursor_follow의 top,left값이 마우스 좌표 값이 되게 하면 되
    var mouseX = evt.pageX;
    var mouseY = evt.pageY;
    // console.log(mouseX, mouseY);
    $('#cursor_follow')
      .stop(true, false)
      .animate(
        { top: mouseY - 10, left: mouseX - 10},
        'fast',
        'easeOutExpo'
      );

    /* 패널1 h3태그 애니메이션 */
    // 마우스좌표값이 h3태그 좌표값이 되면 css로 미리 만들어 놓은 애니메이션 클래스 추가
    var _aP1_h3 = $('#aP1').find('h3');
    var h3Pos = parseInt(_aP1_h3.offset().top);
    // console.log(mouseY,h3Pos);
    if(mouseY >= (h3Pos-100)) _aP1_h3.addClass('h3_ani');
    else { //마우스 올리면 다시 사라지기
      _aP1_h3.removeClass('h3_ani');
      _aP1_h3.find(':button').removeClass('on');
      _aP1_h3.find(':button').prev().removeClass('on');
      $('#aP1ImgBox, #aP1TxtBox').removeClass('h3_ani');
    }

    // click글자 클릭하면 도전, 성장 나오기
    _aP1_h3.find(':button').on('click',function(){
      $(this).addClass('on');
      $(this).prev().addClass('on');
      
      // 도전, 성장 나올때 짝꿍 컨텐츠 나오기
      var tgCnt = $($(this).data('href'));
      // console.log(tgCnt);
      tgCnt.addClass('h3_ani');

    });
  });

  /* 패널1 테두리 애니메이션 스크립트 */
  // #aP1ImgBox 자식(div)중에 버튼을 가지고 있는 div만 선택
  $('#aP1ImgBox div').has(':button').on({
    'mouseenter focusin': function(){
    // var btnIdx = $(this).index();
    // console.log(btnIdx);
      $(this).prepend('<div class="bd_ani"></div>');
    },
    'mouseleave focusout':function(){
      var removeTg = $('.bd_ani');
      removeTg.remove();
    }
  });

  /* 패널2 토글 스크립트 */
  var _toggle = $('.toggle')
  var tit = new Array(6);
  tit[0] = 'html';
  tit[1] = 'css';
  tit[2] = 'script';
  tit[3] = 'jQuery';
  tit[4] = 'sass';
  tit[5] = 'ps&ai';

  _toggle.find('.tg').on('click',function () {
    var toggleidx = $(this).closest('.toggle_list').index();
    // console.log(toggleidx);
    $('.img_box').children().eq(toggleidx).children('p').toggleClass('light');

    // console.log();
    
    if(!$(this).prev().prop('checked')) {
      $(this).text($(this).data('num'));
    } else {
      $(this).text(tit[toggleidx]);
    }
  });

  /* 패널4 버튼 클릭 스크립트 */
  var _prevBtn = $('#aP4 .arrow_box .left');
  var _nextBtn = $('#aP4 .arrow_box .right');
  var _aP4Move = $('#aP4 .cnt_list');

  _nextBtn.on('click',function(){
    _aP4Move.stop().animate({left:'-76%'},1000);
  },
  );
  _prevBtn.on('click',function(){
    _aP4Move.stop().animate({left:0},1000)
  });
  
  /* 패널3 스크립트 */
  // 애니메이션이 진행중이면 함수 강제종료
  var slideWrap = $('#aP3 .slide_wrap');
  $('#circle #txt1').addClass('view');
  slideWrap.children().eq(1).attr('aria-hidden', false).siblings().attr('aria-hidden', true);

  if(slideWrap.is(':animated')) return false;

  /* 업(이전) 버튼 클릭시
  -마지막 요소 복제, 복제요소를 첫째로 동적생성
  -마지막 요소 삭제 */
  $('#aP3 .arrow_box button').on('click', function () {
    var btnNum = $(this).index();
    if (btnNum === 0) { // up이전 클릭
      slideWrap.prepend(slideWrap.children().last().clone());
      slideWrap.children().last().remove();
    } else { // down다음 클릭
      // slideWrap.animate({marginTop:'-10%'});
      slideWrap.append(slideWrap.children().first().clone());
      slideWrap.children().first().remove();
    }

    var circleColor = slideWrap.children().eq(1).data('color');
    var txtTarget = slideWrap.children().eq(1).data('tgtxt');
    console.log(circleColor, txtTarget);
    $('#circle').removeClass().addClass(circleColor).find(txtTarget).addClass('view').siblings().removeClass('view');
    // 접근성 추가
    slideWrap.children().eq(1).attr('aria-hidden', false).siblings().attr('aria-hidden', true);
  });


  // $('#aP3 .up_btn').on('click',function () {
  //   slideWrap.prepend(slideWrap.children().last().clone());
  //   slideWrap.children().last().remove();
  // });
  
  // 다운(다음) 버튼 클릭시
  // -첫번째 요소 복제, 복제 요소를 마지막으로 동적생성
  // -첫번째 요소 삭제
  // $('#aP3 .down_btn').on('click',function () {
  //   // slideWrap.animate({marginTop:'-10%'});
  //   slideWrap.append(slideWrap.children().first().clone());
  //   slideWrap.children().first().remove();    
  // });

  /* $('#aP3 .down_btn, #aP3 .up_btn').on('click',function () {
    // 첫번째 자식이 (색상명) 클래스를 가지고 있으면 circle에 (색상명)클래스 추가
    var color = new Array(4);
    color[0] = 'white';
    color[1] = 'black';
    color[2] = 'orange';
    color[3] = 'blue';
    
    var circle = $('#aP3 .circle');

    // if(slideWrap.children().first().hasClass('white')) circle.addClass('white');
    // else circle.removeClass('white');
    // if(slideWrap.children().first().hasClass('black')) circle.addClass('black');
    // else circle.removeClass('black');
    // if(slideWrap.children().first().hasClass('orange')) circle.addClass('orange');
    // else circle.removeClass('orange');
    // if(slideWrap.children().first().hasClass('blue')) circle.addClass('blue');
    // else circle.removeClass('blue');

    
    if(slideWrap.children().first().hasClass('white')) {
      var tgTxt = $('#aP3 .txt_box');
      circle.addClass('white');
      tgTxt.find('span').text('A 01');
      tgTxt.find('.main_tit').text('웹 접근성 보고서');
      tgTxt.find('.sub_tit').text('web Accessibility report');
      tgTxt.find('more_cnt').text('a설명설명');
    } else {
      circle.removeClass('white');
    }
    if(slideWrap.children().first().hasClass('black')) {
      var tgTxt = $('#aP3 .txt_box');
      circle.addClass('black');
      tgTxt.find('span').text('F 01');
      tgTxt.find('.main_tit').text('푸르지오');
      tgTxt.find('.sub_tit').text('clone coding Fixed');
      tgTxt.find('more_cnt').text('f설명설명');
    } else {
      circle.removeClass('black');
    }
    if(slideWrap.children().first().hasClass('orange')) {
      var tgTxt = $('#aP3 .txt_box');
      circle.addClass('orange');
      tgTxt.find('span').text('R 01');
      tgTxt.find('.main_tit').text('라온시큐어');
      tgTxt.find('.sub_tit').text('clone coding Responsive');
      tgTxt.find('more_cnt').text('r설명설명');
    } else {
      circle.removeClass('orange');
    }
    if(slideWrap.children().first().hasClass('blue')) {
      var tgTxt = $('#aP3 .txt_box');
      circle.addClass('blue');
      tgTxt.find('span').text('D 01');
      tgTxt.find('.main_tit').text('홈페이지명');
      tgTxt.find('.sub_tit').text('clone coding reDesign');
      tgTxt.find('more_cnt').text('d설명설명');
    } else {
      circle.removeClass('blue');
    }
  }); */
  
  
});
