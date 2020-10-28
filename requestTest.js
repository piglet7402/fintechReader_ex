var request = require('request');
var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwMDM0NzM2Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MTE2NDU5MzAsImp0aSI6ImE5NzQ3YWMxLTg4NzAtNGY4YS04OTYxLWIwMTQwMmYxMTQwOSJ9.Z4Z4_rCniMOc3afsoyVhN51UhsSZdF52DvMqxLgOVoU" // 여러분의 토큰을 넣어주세요
var userseqno ="1100034736" // 사용자 번호를 넣어주세요
var finuseno = "199159919057870972485182" // 대표 계좌 번호를 입력해주세요
var useCompanyId = "T991599190U"//이용기관 번호를 세팅해주세요

var countnum = Math.floor(Math.random() * 1000000000) + 1;
var transId = useCompanyId + countnum; //이용기관번호 본인것 입력

//request(요청) 정의
var option = {
    method: "GET",
    url:
      "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    //accesstoken 입력
    //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
    qs: {
      bank_tran_id: transId,
      fintech_use_num: finuseno,
      inquiry_type: "A",
      inquiry_base: "D",
      from_date: "20190101",
      to_date: "20190101",
      sort_order: "D",
      tran_dtime: "20200924163300",
    }
};
request(option, function (err, response, body) {
    var resResult = JSON.parse(body);
    console.log(resResult);
});
