<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="en" />
<meta name="author" content="OwlFocus">
<title>OwlFocus信息管理系统</title>
<link rel="shortcut icon" href="${request.getContextPath()}/static/imgs/system/favicon.ico" />
<script type="text/javascript"
	src="<%=request.getContextPath() %>/static/jquery/jquery-1.10.2.js"></script>
<script
	src="<%=request.getContextPath() %>/static/jquery/ui/bootstrap/assets/js/vendor/bootstrap.js"
	type="text/javascript"></script>
<!-- Le styles -->
<link rel="stylesheet"
	href="<%=request.getContextPath() %>/static/jquery/ui/bootstrap/assets/css/bootstrap.min.css">
<link rel="stylesheet"
	href="<%=request.getContextPath() %>/static/jquery/ui/bootstrap/assets/css/font-awesome.min.css">
<style type="text/css">
.form-signin {
	max-width: 330px;
	padding: 15px;
	margin: 0 auto;
}

.form-signin .form-signin-heading,.form-signin .checkbox {
	margin-bottom: 10px;
}

.form-signin .checkbox {
	font-weight: normal;
}

.form-signin .form-control {
	position: relative;
	font-size: 16px;
	height: auto;
	padding: 10px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.form-signin .form-control:focus {
	z-index: 2;
}

.form-signin input[type="text"] {
	margin-bottom: -1px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.form-signin input[type="password"] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.account-wall {
	margin-top: 20px;
	padding: 40px 0px 20px 0px;
	background-color: #f7f7f7;
	-moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	-webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.login-title {
	color: #555;
	font-size: 18px;
	font-weight: 400;
	display: block;
}

.profile-img {
	width: 96px;
	height: 96px;
	margin: 0 auto 10px;
	display: block;
	-moz-border-radius: 50%;
	-webkit-border-radius: 50%;
	border-radius: 50%;
}

.need-help {
	margin-top: 10px;
}

.new-account {
	display: block;
	margin-top: 10px;
}
</style>
<script type="text/javascript">
$(function () {
   $('#loginBtn').click( function() {
	   location.href ='<%=request.getContextPath() %>/indexs/jqueryui';
   });
});
</script>
</head>
<body>
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-4 col-md-offset-4">
					<h1 class="text-center login-title">Sign in to continue to
						Bootsnipp</h1>
					<div class="account-wall">
						<img class="profile-img"
							src="<%=request.getContextPath() %>/static/imgs/system/logo.png"
							alt="">
						<form class="form-signin">
							<input type="text" class="form-control" placeholder="Email"
								required autofocus> <input type="password"
								class="form-control" placeholder="Password" required>
							<button id="loginBtn" class="btn btn-lg btn-primary btn-block" type="submit">
								Sign in</button>
							<label class="checkbox pull-left"> <input type="checkbox"
								value="remember-me"> Remember me
							</label> <a href="#" class="pull-right need-help">Need help? </a><span
								class="clearfix"></span>
						</form>
					</div>
					<a href="#" class="text-center new-account">Create an account </a>
				</div>
			</div>
		</div>
</body>
</html>