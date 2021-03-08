$(document).ready(function () {
  // 모달제어 - 모든일은 열기버튼 클릭하면 그 안에서 일어나
  // 1) 열기버튼 클릭시 제어
  
  $('.md_open_btn').on('click',function(){
  /* 
  ! 1-1) 스크롤 지금페이지 고정으로. 처음으로 올라가지 않게
  1-2) 딤 생성후 보이게, 모달 내용 보이게
  1-3) 포커스 모달내용으로 강제이동 */
  var openBtn = $(this); //열기버튼
  var tgMd = $(this).data('href'); //타겟모달
  var _tgMd = $($(this).data('href'));
  var closeBtn = $('.md_close_btn'); //닫기버튼

  $('#main').find('.md_wrap').before('<div id="dim"></div>');
  $('#dim, .md_wrap,' + tgMd).css('visibility', 'visible');
  closeBtn.focus();
  
  
  // ! 2) 모달 열린 상태시 키보드 제어
  
  // 3) 닫기버튼 클릭시 제어
  closeBtn.on('click',function(){
  /* 
  3-1) 딤 숨기고, 삭제
  3-2) 모달내용 숨기기. 삭제아니고 숨기기
  3-3) 포커스 열었던 버튼으로 강제 이동
  ! 3-4) 스크롤 고정 풀기
  3-5) 딤화면 클릭시 닫기버튼 클릭한것처럼 */
    $('#dim, .md_wrap,' + tgMd).css('visibility', 'hidden');
    $('#dim').remove();
    openBtn.focus();
  });

  $('#dim, .md_wrap').on('click', function () {
    closeBtn.click();
  });
  
  });
});