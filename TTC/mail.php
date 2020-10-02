<!-- Через 3 секунд после появления сообщения об отправке или ошибке — отправляемся на сайт Кода :) --> 
<!-- <meta http-equiv='refresh' content='3; url=http://thecode.local/'> 
 --><meta charset="UTF-8" />
<?php
	if (isset($_POST['name']) && $_POST['name'] != "") {
		$name = htmlspecialchars($_POST['name']);
	}

	if (isset($_POST['email']) && $_POST['email'] != "") {
		$email = htmlspecialchars($_POST['email']);
	}

	if (isset($_POST['tel']) && $_POST['tel'] != "") {
		$tel = htmlspecialchars($_POST['tel']);
	}

	if (isset($_POST['question']) && $_POST['question'] != "") {
		$question = htmlspecialchars($_POST['question']);
	}

	if (isset($_POST['comment']) && $_POST['comment'] != "") {
		$body = htmlspecialchars($_POST['comment']);	 
	}


	$address = "sharipow03@mail.ru";

	$mes  = "<b>Имя:</b> $name <br>";	
	$mes .= "<b>E-mail:</b> $email <br>";
 	$mes .= "<b>Телефон:</b> $tel <br>";
 	$mes .= "<b>Вопрос:</b> $question <br>";
	$mes .= "<b>Комментарий:</b> $body"; 
	
	$send = mail ($address, 'Новый клиент', $mes, "Content-type:text/html; charset = UTF-8; From:$email");//собственно сам вызов функции отправки сообщения на сервере

	if ($send) //проверяем, отправилось ли сообщение
		echo '<h1 style="color: green">Сообщение отправлено успешно!</h1>';
	else 
		echo '<h1 style="color: red">Ошибка, сообщение не отправлено! Возможно, проблемы на сервере</h1>';
?>