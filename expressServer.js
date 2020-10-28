var express = require("express"),
app = express();
var port = process.env.PORT || 3000;
var request = require('request');

app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/views"); //ejs 를 사용하기위한 디렉토리 설정
app.set("view engine", "ejs"); //ejs 를 사용하기위한 뷰 엔진 설정

var twoLeggedAccessToekn = ""//발급받은 2legged AccessToken 을 입력

var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwMDM0NzM2Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MTE2NDU5MzAsImp0aSI6ImE5NzQ3YWMxLTg4NzAtNGY4YS04OTYxLWIwMTQwMmYxMTQwOSJ9.Z4Z4_rCniMOc3afsoyVhN51UhsSZdF52DvMqxLgOVoU" // 여러분의 토큰을 넣어주세요
var userseqno ="1100034736" // 사용자 번호를 넣어주세요
var finuseno = "199159919057870972485182" // 대표 계좌 번호를 입력해주세요
var useCompanyId = "T991599190U"//이용기관 번호를 세팅해주세요

app.get("/main", function (req, res) {
    res.render('main');
});

app.get('/transaction', function(req, res){
    res.render('transaction');
})

app.get('/pay', function(req, res){
    res.render('qrcode');
})

app.get('/balance', function(req, res){
    res.render('balance');
})


app.post('/myaccount', function(req, res){
    var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        //accesstoken 입력
        //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
        qs: {
          user_seq_no: userseqno,
          //#자기 키로 시크릿 변경
        },
    };
    request(option, function (err, response, body) {
        var resResult = JSON.parse(body);
        console.log(resResult);
        //json 문서를 파싱하여 javascript 오브젝트로 변환
        res.json(resResult);
    });
})

app.post('/getBalance', function(req, res){
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = useCompanyId + countnum; //이용기관번호 본인것 입력

    var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        //accesstoken 입력
        //form 형태는 form / 쿼리스트링 형태는 qs / json 형태는 json ***
        qs: {
            bank_tran_id : transId,
            fintech_use_num : "199159919057870972485182",
            tran_dtime : "20201021210800"
        },
    };
    request(option, function (err, response, body) {
        var resResult = JSON.parse(body);
        console.log(resResult);
        //json 문서를 파싱하여 javascript 오브젝트로 변환
        res.json(resResult);
    });
})

app.post('/get_transaction', function(req, res){
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = useCompanyId + countnum; //이용기관번호 본인것 입력
    var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        qs: {
            bank_tran_id : transId,
            fintech_use_num : finuseno,
            inquiry_type:'A',
            inquiry_base:'D',
            from_date:'20190101',
            to_date:'20190101',
            sort_order:'D',
            tran_dtime:'20201021213030'
        },
    };
    request(option, function (err, response, body) {
        var resResult = JSON.parse(body);
        console.log(resResult);
        //json 문서를 파싱하여 javascript 오브젝트로 변환
        res.json(resResult);
    });
})

app.post('/withdraw', function(req, res){
    var qrcodefinnon = req.body.qrcodeData;  
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = useCompanyId + countnum; //이용기관번호 본인것 입력
    var option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        json: {
            "bank_tran_id": "T991599190U001016614",
            "cntr_account_type": "N",
            "cntr_account_num": "7832932596",
            "dps_print_content": "쇼핑몰환불",
            "fintech_use_num": "199159919057870972485182",
            "wd_print_content": "오픈뱅킹출금",
            "tran_amt": "1000",
            "tran_dtime": "20201026192900",
            "req_client_name": "홍길동",
            "req_client_bank_code": "097",
            "req_client_account_num": "1101230000678",
            "req_client_num": "HONGGILDONG1234",
            "transfer_purpose": "TR",
            "recv_client_name": "진상언",
            "recv_client_bank_code": "097",
            "recv_client_account_num": "7832932596"        
        },
    };
    request(option, function (err, response, body) {
        var resResult = JSON.parse(body);
        console.log(resResult);
        if(resResult.res_code == "A0000"){
            res.json(1);
        }
        //json 문서를 파싱하여 javascript 오브젝트로 변환
    });
})

app.listen(port);
console.log("Listening on port ", port);
