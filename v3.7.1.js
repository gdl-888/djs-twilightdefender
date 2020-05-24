const Discord = require('discord.js');
const client = new Discord.Client();

function print(x) {
	console.log(x);
}

var time = 0, botVer = "3.7.1", rev = "B";

client.on('ready', () => {
	print(`로그인 완료.`);
});

var updu = "";
var isup = false;
var upmx = 100;
var upnm;
var uptr = 1;
var upch;

var orgRl = {};

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

/* 여기부터 봇 코드 */

var helpMsg = 	"twilight-defender 봇 버전 " + botVer + " - 말을 걸거나 관리 기능을 사용합니다\n" +
				"\n" +
				"`    @twilight-defender [문장|[도움말|/?]]`\n" +
				"\n" +
				"`        문장 - 봇에게 말할 문장입니다.`\n" +
				"`        도움말 - 도움말 내용을 표시합니다.`\n" +
				"\n\n" +
				"`    twilight-defender [[/B] [ID]] [[/U] ID] [[/G] [+A|+B] ID] [[/D] ID] [[/P] ID] [[/W] ID] [[/R] ID] [/C] [/V] [/K [가위|바위|보]] [/O]`\n" +
				"\n" +
				"`        /B - 지정한 사용자를 차단합니다`\n" +
				"`        /U - 지정한 사용자의 차단을 해제합니다`\n" +
				"`        /G - 지정한 사용자에게 권한을 부여합니다`\n" +
				"`                 A - 정회원`\n" +
				"`                 B - 준회원`\n" +
				"`        /D - 지정한 사용자를 준회원으로 강등시킵니다`\n" +
				"`        /P - 지정한 사용자를 정회원으로 승급시킵니다`\n" +
				"\n\n" +
				"`        /W - 지정한 사용자에게 경고를 부여합니다`\n" +
				"`        /R - 지정한 사용자의 경고를 하나 지웁니다`\n" +
				"`        /C - 모든 사용자의 경고를 초기화합니다`\n" +
				"`        /L - 모든 사용자의 경고 수를 보여줍니다`\n" +
				"\n" +
				"`        /V - twilight-defender 정보 및 버전`\n" + 
				"\n" +
				"`        /K - 가위바위보 놀이를 신청합니다`\n" + 
				"`        /O - 업다운(숫자맞추기) 놀이를 신청합니다`\n" +  
				"\n" +
				"`        /? - 이 도움말을 표시합니다.`\n" + 
				"`        /Z - (알아서 시도하시오)`\n" + 
				"\n" + 
				"`        다중 스위치는 지원하지 않습니다.`";
				
var chtHlp = "\
<twilight-defender 치트> \n\
    `$MKSWEAR`: twilight-defender을 욕하게 만든다\n\
    `$SWEARWRD_CHT`: twilight-defender이 욕설로 인식하여 이 메시지를 보낸사람에게 경고를 준다\n\
	`$MK_BNYSF`: twilight-defender이 자신을 차단하는것을 시도하게 한다";

var warningList = {};

client.on('message', (msg) => { /* 봇에 메시지가 올 때 */
	var imsg = msg.content.toUpperCase();
	var ismsg = imsg.replace(/\s/gi, '');
	
	if(imsg === "$MKSWEAR") {
		msg.channel.send("shit");
	}
	
	if(imsg === "$MK_BNYSF") {
		msg.channel.send("twilight-defender /B 672008827276623874");
	}
	
	/* 욕설 필터링 */
	if( 
		imsg.includes('씨발') || ismsg.includes('왓더퍼킹') || ismsg.includes('젠장') || imsg.includes('병신') ||
		imsg === '$SWEARWRD_CHT' || imsg.includes('FUCK') || imsg.includes('개새끼') || imsg.includes('지랄') ||
		imsg.includes('SHIT') || ismsg.includes('ASSHOLE') || ismsg.includes('존나') || ismsg.includes('좇나') ||
		ismsg.includes('ㅄ') || ismsg.includes('ㅅㅂ') || ismsg.includes('ㅆㅂ') || ismsg.includes('ㅂㅅ') || /* --- */
		imsg.includes('FUCK') || imsg.includes('SHIT') || ismsg.includes('ASSHOLE') || ismsg.includes('PISSOFF') ||
		ismsg.includes('DICKHEAD') || imsg.includes('BITCH') || ismsg.includes('BASTARD') ||
		imsg.includes('씨발') || imsg.includes('병신') || imsg.includes('지랄') || imsg.includes('ㅅㅂ') || imsg.includes('ㅆㅂ') || 
		imsg.includes('ㅄ') || imsg.includes('ㅂㅅ') || imsg.includes('젠장') || imsg.includes('개새끼') || 
		imsg.includes('존나') || imsg.includes('좆나') || imsg.includes('뻑유') || imsg.includes('씨발') || ismsg.includes('왓더퍼킹')
		|| imsg.includes('坏蛋') || imsg.includes('笨蛋') || imsg.includes('王八蛋') || imsg.includes('滚蛋') || imsg.includes('糊涂蛋')
		|| imsg.includes('混蛋 ') || imsg.includes('我靠') || imsg.includes('我尻') || imsg.includes('牛屄') || imsg.includes('拍马屁')
		 || imsg.includes('滚开') || imsg.includes('滚开') || imsg.includes('靠北') || imsg.includes('混賬') || imsg.includes('你丫挺的')
		  || imsg.includes('妈的')
	) {
		var SML = [
			"아니.. 고운 말을 사용합시다!",
			"욕을 쓰면 안 돼요...",
			"어허~ 욕은 쓰지 말고 고운 말을 사용해야죠!",
			"고운 말은 모두를 기분좋게 만든답니다~"
		];
		
		print('[[' + warningList[msg.member.toString()] + ']]');
		if(warningList[msg.member.toString()] == undefined) {
			warningList[msg.member.toString()] = 1;
		} else {
			warningList[msg.member.toString()]++;
		}
		if(warningList[msg.member.toString()] >= 3) {
			warningList[msg.member.toString()] = 0;
	
			msg.channel.send('욕설이 세 번 이상 감지됐읍니다. 30분 후에 자동 해제됩니다. 이 차단이 오류가 있다고 생각하시면 차소게에 설명을 해주십시오.');
			
			try {
				if(!msg.member.toString().includes("672008827276623874")) {
					msg.member.addRole('673797140962738225');
					
					setTimeout(function() {
						msg.member.removeRole('673797140962738225');
					}, 60000 * 30);
					
					var username = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
					client.channels.get('684395442397642774').send(getDateTime() + " **twilight-defender** 사용자가 **" + username + "** *(사용자 차단)* (30분 동안) (욕설 사용)");
				} else {
					msg.channel.send("[" + msg.member.toString() + ']차단이 정상적으로 이루어지지 않았습니다 다시 시도해주십시오.');
				}
			} catch(e){}
		}
		sendMsg = ""; /* SML[ Math.floor(Math.random() * SML.length) ]; */
		try {
			sendMsg += ' 욕을 세 번 이상 사용하시면 차단됩니다. 현재 ' + msg.member.toString() + '님의 경고횟수는 ' + String(warningList[msg.member.toString()]) + '회입니다.  경고는 12시간마다 초기화됩니다.';
		} catch(e) {
			sendMsg += ' 현재 ' + msg.member.toString() + '님의 경고횟수은 0회입니다.';
		}
		msg.channel.send(sendMsg);
		print(">>> " + sendMsg);
	}
	
	var message = msg.content.toUpperCase().replace(/\s/gi, '');
	var sendMsg;
	if(message.includes('천리안')) {
		msg.channel.send("차원이 다른 통신*!* 한국인의 선택 *|천|리|안|*");
	}
	else if(msg.isMemberMentioned(client.user)) { /* 멘션됨 */
		print("<<< " + msg.content);
		if(message.includes('안녕히계')) {
			sendMsg = '안녕히 가십시오.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message.includes('안녕히가')) {
			sendMsg = '안녕히 계십시오.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message.includes('안녕히')) {
			sendMsg = '안녕히 가십시오.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message.includes('안녕')) {
			sendMsg = '안녕하십니까.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message.includes('좋은아침')) {
			sendMsg = '잘 주무셨읍니까.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message.includes('HELLO') || message.includes('HI')) {
			sendMsg = 'Hello.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message.includes('뭐해') || message.includes('뭐하')) {
			var A = [
				'쉬고있읍니다.',
				'운동중입니다.',
				'음악을 듣고있읍니다.',
				'위키질...',
				'영화를 보고 있읍니다.',
				'웹서핑중입니다.'
			];
			var sm = A[ Math.floor(Math.random() * A.length) ]
			msg.channel.send( sm );
		}
		else if(message.includes('죄송') || message.includes('미안') || message.includes('SORRY')) {
			msg.channel.send( "괜찮습니다..." );
		}
		else if(message.includes('WHATAREYOUDO')) {
			var A = [
				'I am resting.',
				'I am exercising.',
				'I am listening to music.'
			];
			sendMsg = A[ Math.floor(Math.random() * A.length) ];
			msg.channel.send( sendMsg );
			print(">>> " + sendMsg);
		}
		else if(message.includes('누구') || message.includes('뭐야') || message.includes('이거뭐지') || message.includes('이게뭐지') || message.includes('이건뭐지')) {
			sendMsg = '난 봇이고, 이 써버를 관리합니다.';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else if(message === '네' || message === '예' || message.includes('알겠') || message.includes('알았') || message === 'OK' || message === 'OKAY') {
			
		}
		else if(message.includes('사용법') || message.includes('도움말') || message.match(/[/][?]$/)) {
			print("<<< 사용자가 사용법을 요청했읍니다");
			
			msg.channel.send(
				helpMsg
			);
		}
		else if(message.includes('가위바위보')) msg.channel.send("사용법: `twilight-defender /K [가위|바위|보]`");
		else if(message.includes('업다운') || message.includes('UPDOWN')) msg.channel.send("사용법: `twilight-defender /O");
		else if(
				msg.content.toUpperCase().replace(/\s/gi, '').includes('WHOAREYOU') ||
				msg.content.toUpperCase().replace(/\s/gi, '').includes('WHOISTHIS') ||
				msg.content.toUpperCase().replace(/\s/gi, '').includes('WHATISTHIS')
		) {
			sendMsg = "I am a bot, and I manage this server.";
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
		else {
			sendMsg = '무슨 말씀인지 모르겠읍니다...';
			msg.channel.send(sendMsg);
			print(">>> " + sendMsg);
		}
	}
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][B]\s{0,10}$/i) || msg.content.match(/^twilight[-]defender\s{0,10}[/][B]\s{1,10}\D{1,50}$/i)) {
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][B]\s{0,10}/i, '');
		msg.channel.send("매개 변수가 틀립니다 - " + userID);
	}
	
	/* 사용자 차단 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][B]\s{1,10}\d{1,50}$/i)) {
		print("<<< 차단요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][B]\s{1,10}/i, '');
		msg.channel.send("사용자 차단을 시도합니다...");
		if(msg.member.roles.find(r => r.name === "관리자")){
			var memberObj = msg.guild.members.get(userID) /* client.users.find(user => user.id == userID) */;
			var username = client.users.find(user => user.id == userID)['username'];

			try {
				if(userID.includes("672008827276623874")) {
					Disturber = 3 + "abc"; /* 오류 발생시키기 */
					msg.channel.send("[" + username + "]차단이 정상적으로 이루어지지 않았읍니다. 다시 시도해주십시오. (" + String(e) + ")");
				} else {
					print(1);
					
					memberObj.addRole('673797140962738225');
					
					print(2);
					
					var adminnm = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
					client.channels.get('684395442397642774').send(getDateTime() + " **" + adminnm + "** 사용자가 **" + username + "** *(사용자 차단)*");
					
					msg.channel.send("사용자 " + String(username) + "이 성공적으로 차단됐읍니다.");
					print(3);
				}
			} catch(e) {
				msg.channel.send("[" + username + "]차단이 정상적으로 이루어지지 않았읍니다. 다시 시도해주십시오. (" + String(e) + ")");
			}
		} else {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}

	/* 경고 목록 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][L]/i)) {
		var sndMsg = "--- 모든 사용자의 경고 횟수 목록 ---\n";

		const list = client.guilds.get("670426524201254922"); 
		list.members.forEach(function(member) {
			var wrnCnt = warningList["<@" + String(member.user.id) + ">"];
			sndMsg += " * ";
			if(wrnCnt === undefined) sndMsg += member.user.username + " - 경고 없음\n";
			else sndMsg += member.user.username + " - " + wrnCnt + "회\n";
		});

		sndMsg += "\n모든 사용자의 경고 초기화 " + String(12 - time) + "시간 전입니다";

		msg.channel.send(sndMsg);
	}

	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][C]/i)) {
		print("<<< 경고 초기화...");
		if(msg.member.roles.find(r => r.name === "최고 관리자")){
			try {
				print(1);
				
				warningList = {};
				
				print(2);
				
				msg.channel.send("[[모든 사용자의 경고가 초기화되었읍니다!]]");
			} catch(e) {
				msg.channel.send("문제가 발생했습니다!");
			}
		} else {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}
	
	/* 경고 부여 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][W]\s{1,10}\d{1,50}$/i)) {
		print("<<< 경고요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][W]\s{1,10}/i, '');
		try {
			if(msg.member.roles.find(r => r.name === "관리자") || msg.member.roles.find(r => r.name === "중재자")){
				var username = client.users.find(user => user.id == userID)['username'];
				var userIDs = "<@" + String(userID) + ">";
				
				print('[[' + warningList[userIDs] + ']]');
				if(warningList[userIDs] == undefined) {
					warningList[userIDs] = 1;
				} else {
					warningList[userIDs]++;
				}
				if(warningList[userIDs] >= 3) {
					warningList[String(warningList[msg.member.toString()])] = 0;
			
					msg.channel.send('경고가 3회 부여됐읍니다. 30분 후에 차소게에 해제요청을 하십시오. 이 차단이 오류가 있다고 생각하시면 차소게에 설명을 해주십시오.');
					
					try {
						usrobj = msg.guild.members.get(userID);
						print(usrobj);
						usrobj.addRole('673797140962738225');
						usrobj.removeRole('670566324660994078');
						usrobj.removeRole('670427230429642792');
					} catch(e){}
				}
				try {
					sendMsg = userIDs + ', 주의해주십시오. 현재 ' + userIDs + '님의 경고횟수는 ' + String(warningList[userIDs]) + '회입니다. 경고는 12시간마다 초기화됩니다. 세 번 이상 받으면 차단됩니다.';
				} catch(e) {
					sendMsg = ' 현재 ' + userIDs + '님의 경고횟수은 0회입니다.';
				}
				msg.channel.send(sendMsg);
				print(">>> " + sendMsg);
			} else {
				msg.channel.send("액세스가 거부되었읍니다.");
			}
		} catch(e) {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}

	/* 경고 해제 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][R]\s{1,10}\d{1,50}$/i)) {
		print("<<< 경고요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][R]\s{1,10}/i, '');
		try {
			if(msg.member.roles.find(r => r.name === "관리자") || msg.member.roles.find(r => r.name === "중재자")){
				var username = client.users.find(user => user.id == userID)['username'];
				var userIDs = "<@" + String(userID) + ">";
				
				print('[[' + warningList[userIDs] + ']]');

				if(warningList[userIDs] == undefined || warningList[userIDs] == 0) {
					warningList[userIDs] = 0;
				} else {
					warningList[userIDs]--;
				}
				try {
					sendMsg = ' 현재 ' + userIDs + '님의 경고가 하나 해제되었습니다. 이제 경고횟수는 ' + String(warningList[userIDs]) + '회입니다. 경고는 12시간마다 초기화됩니다.';
				} catch(e) {
					sendMsg = ' 현재 ' + userIDs + '님의 경고횟수는 0회입니다.';
				}
				msg.channel.send(sendMsg);
				print(">>> " + sendMsg);
			} else {
				msg.channel.send("액세스가 거부되었읍니다.");
			}
		} catch(e) {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}
	
	/* 준회원 강등 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][D]\s{1,10}\d{1,50}$/i)) {
		print("<<< 강등요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][D]\s{1,10}/i, '');
		if(msg.member.roles.find(r => r.name === "관리자")){
			try {
				var memberObj = msg.guild.members.get(userID) /* client.users.find(user => user.id == userID) */;
				var username = client.users.find(user => user.id == userID)['username'];
				
				print(1);
				
				memberObj.addRole('670427230429642792'); /* 준회원 */
				memberObj.removeRole('670566324660994078');
				
				print(2);
				
				var adminnm = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
				client.channels.get('684395442397642774').send(getDateTime() + " **" + adminnm + "** 사용자가 **" + username + "** *(사용자 강등)*");
				
				msg.channel.send("[[사용자 " + String(username) + "이(가) 성공적으로 준회원으로 강등되었습니다]]");
			} catch(e) {
				msg.channel.send("[" + username + "] 조정이 정상적으로 이루어지지 않았읍니다. 다시 시도해주십시오. (" + String(e) + ")");
			}
		} else {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}
	
	/* 정회원 승급 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][P]\s{1,10}\d{1,50}$/i)) {
		print("<<< 승급요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][P]\s{1,10}/i, '');
		if(msg.member.roles.find(r => r.name === "관리자") || msg.member.roles.find(r => r.name === "중재자")){
			try {
				var memberObj = msg.guild.members.get(userID) /* client.users.find(user => user.id == userID) */;
				var username = client.users.find(user => user.id == userID)['username'];
				
				print(1);
				
				memberObj.removeRole('670427230429642792'); /* 준회원 */
				memberObj.addRole('670566324660994078');
				
				print(2);
				
				var adminnm = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
				client.channels.get('684395442397642774').send(getDateTime() + " **" + adminnm + "** 사용자가 **" + username + "** *(사용자 승급)*");
				
				msg.channel.send("[[사용자 " + String(username) + "이(가) 이제 정회원으로 승급되었습니다!]]");
			} catch(e) {
				msg.channel.send("[" + username + "] 조정이 정상적으로 이루어지지 않았읍니다. 다시 시도해주십시오. (" + String(e) + ")");
			}
		} else {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}
	
	/* 가위바위보 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][K]/i)) {
		if(msg.content.match(/^twilight[-]defender\s{0,10}[/][K]\s{1,10}(가위|바위|보)/i)) {
			var fng = [
				"가위",
				"바위",
				"보"
			];
			
			msg.channel.send( fng[  Math.floor(Math.random() * fng.length) ] + "!" );
		} else {
			msg.channel.send("사용법: `twilight-defender /K [가위|바위|보]`");
		}
	}
	
	/* 업다운 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][O]/i)) {
		if(isup == true && updu != msg.member.toString()) {
			msg.channel.send("지금은 다른 사용자가 하고있읍니다.");
		} else {
			try {
				msg.channel.send("업다운 게임\n제한시간은 30초입니다 - 포기하려면 `twilight-defender /N / 숫자를 말하려면 그냥 대화창에 숫자를 쓰시오.`");
				
				upmx = 100
				
				/*
					var updu = "";
					var isup = false;
					var upmx = 100;
					var upnm;
				*/
				
				updu = msg.member.toString();
				isup = true;
				upch = msg.channel.id;
				
				upnm = Math.floor(Math.random() * upmx) + 1;
				
				msg.channel.send("숫자를 입력하세요!" );
			} catch(e) {
				msg.channel.send("문제가 발생했습니다! 범위사용법: 1부터 X까지 숫자에서 X 지정");
			}
		}
	}
	/* 업다운포기 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][N]/i)) {
		try {
			if(isup == true && updu == msg.member.toString()) {
				isup = false;
				uptr = 0;
				msg.channel.send("게임이 포기되었읍니다");
			}
		} catch(e) {
		}
	}
	else if(msg.content.match(/^\d{1,999}$/)) {
		if(isup == true && updu == msg.member.toString()) {
			var usnm = Number(msg.content);
			if(usnm == upnm) {
				msg.channel.send("맞추셨습니다! - " + String(uptr));
				uptr = 0;
				isup = false;
			} else if(upnm > usnm) {
				msg.channel.send("업!");
				uptr++;
			} else {
				msg.channel.send("다운!");
				uptr++;
			}
		}
	}
	
	/* 권한 부여 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][G]\s{1,10}[+](A|B)\s{1,10}\d{1,50}$/i)) {
		print("<<< 권한 부여요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][G]\s{1,10}[+](A|B)\s{1,10}/i, '');
		var grType = msg.content.replace(/^twilight[-]defender\s{0,10}[/][G]\s{1,10}[+]/i, '').replace(/\s{1,10}\d{1,50}$/i, '').toUpperCase();
		
		if(msg.member.roles.find(r => r.name === "관리자")){
			try {
				var memberObj = msg.guild.members.get(userID) /* client.users.find(user => user.id == userID) */;
				var username = client.users.find(user => user.id == userID)['username'];
				
				var txtPermname;
				
				print(1);
				
				switch(grType) {
					case 'B':
						memberObj.addRole('670427230429642792'); /* 준회원 */
						
						var adminnm = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
						client.channels.get('684395442397642774').send(getDateTime() + " **" + adminnm + "** 사용자가 **" + username + "** *(사용자 권한 설정)* (+준회원 )");
						
						break;
					case 'A':
						if(msg.member.roles.find(r => r.name === "관리자")) {
							memberObj.addRole('670566324660994078'); /* 정회원 */
							
							var adminnm = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
							client.channels.get('684395442397642774').send(getDateTime() + " **" + adminnm + "** 사용자가 **" + username + "** *(사용자 권한 설정)* (+정회원 )");
							
							msg.channel.send('[["' + String(username) + '" 권한 부여 - "+정회원 "]]');
							break;
						} else {
							var test = 3 + "ABC"; /* 오류를 일으킨다 */
						}
					default:
						var test = 3 + "ABC"; /* 오류를 일으킨다 */
				}
				print(2);
			} catch(e) {
				msg.channel.send("[" + username + "] 조정이 정상적으로 이루어지지 않았읍니다. 다시 시도해주십시오. (" + String(e) + ")");
			}
		} else {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}
	
	/* 사용자 차단해제 */
	else if(msg.content.match(/^twilight[-]defender\s{0,10}[/][U]\s{1,10}\d{1,50}$/i)) {
		print("<<< 차단 해제요청이 들어왔읍니다.");
		var userID = msg.content.replace(/^twilight[-]defender\s{0,10}[/][U]\s{1,10}/i, '');
		msg.channel.send("사용자 차단해제를 시도합니다...");
		if(msg.member.roles.find(r => r.name === "관리자")){
			try {
				var memberObj = msg.guild.members.get(userID) /* client.users.find(user => user.id == userID) */;
				var username = client.users.find(user => user.id == userID)['username'];
				var adminnm = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/gi, '').replace(/[>]$/gi, ''))['username'];
				
				print(1);
				
				memberObj.removeRole('673797140962738225');
				
				client.channels.get('684395442397642774').send(getDateTime() + " **" + adminnm + "** 사용자가 **" + username + "** *(사용자 차단 해제)*");
				
				print(2);
				
				msg.channel.send("사용자 " + String(username) + "이(가) 성공적으로 차단 해제처리되었읍니다.");
				
			} catch(e) {
				msg.channel.send("[" + username + "]차단해제이 정상적으로 이루어지지 않았읍니다. 다시 시도해주십시오. (" + String(e) + ")");
			}
		} else {
			msg.channel.send("액세스가 거부되었읍니다.");
		}
	}
	else if(msg.content.replace(/\s/g, '') === "twilight-defender/?") {
		print("<<< 사용자가 사용법을 요청했읍니다");
		msg.channel.send(helpMsg);
	}
	else if(msg.content.replace(/\s/g, '').toUpperCase() === "twilight-defender/Z") {
		print("<<< 사용자가 치트사용법을 요청했읍니다");
		msg.channel.send(chtHlp);
	}
	else if(msg.content.replace(/\s/g, '').toUpperCase() === "twilight-defender/V") {
		msg.channel.send("봇 버전 " + botVer + "\n" + 
				"개정 " + rev + "\n" +
				"경고 초기화까지 " + String(12 - time) + "시간 남았읍니다");
	}
	else if(message.includes('twilight-defender') && msg.content !== "twilight-defender /?" && !(msg.member.toString().includes('672008827276623874'))) {
		print("<<< " + msg.content);
		sendMsg = '저에게 말을 걸려면 \\@\\[제 이름] [내용] 형태으로 말하십시오.';
		msg.channel.send(sendMsg);
		print(">>> " + sendMsg);
	}
	else if(message.includes('twilight-defender')) {
		print("<<< " + msg.content);
		sendMsg = 'If you want to talk to me, use the format: \\@\\[My Username] [Message]';
		msg.channel.send(sendMsg);
		print(">>> " + sendMsg);
	}
});

/* 누군가 이 서버에 들어오면 환영 메시지 보낸다. */
client.on('guildMemberAdd', member => {
	var sndMsg = '안녕하십니까, ' + member.user.username + '님. 대화를 하시려면 권한을 요청하십시오...';
	print("<<< 새로운 사용자가 들어왔읍니다 - " + member.user.username);
	member.guild.channels.get('671991154115608586').send(sndMsg);
	print(">>> " + sndMsg);
	client.channels.get('684952646112903170').send(member.user.username + " 사용자가 서버에 입실했습니다");
});

/* 누군가 이 서버에서 나가면 인사 메시지 보낸다. */
client.on('guildMemberRemove', member => {
	try {
		var sndMsg = member.user.username + '님 안녕히 가십시오.';
		print("<<< 사용자가 떠났읍니다 - " + member.user.username);
		member.guild.channels.get('670426525182459927').send(sndMsg);
		print(">>> " + sndMsg);
		client.channels.get('684952646112903170').send(member.user.username + " 사용자가 서버를 떠났습니다");
	} catch(e){}
});

client.login("토큰123");

/* 12시간마다 경고 초기화 */
var warningReset = setInterval(function() { 
   if(time < 11) { 
      time++;
	  print("<<< " + String(time) + "시간 경과...");
   } else {
		warningList = {};
	    print("<<< 경고 초기화됨.");
		time = 0;
   }
}, 3600000);

var time2 = 0;
var upReset = setInterval(function() { 
   if(time2 < 30) { 
		if (isup == true)  time2++;
		else time2 = 0;
   } else {
		isup = false;
		uptr = 0;
		print("<<< 제한시간 끝!");
		time2 = 0;
		try {
			client.channel.get(upch).send("제한시간 끝!");
		} catch(e){}
   }
}, 1000);