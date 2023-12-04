window.addEventListener('DOMContentLoaded', () => {
	const signInPassword = document.getElementById('password');
	const confirmPassword = document.getElementById('confirm');
	const warningPass = document.querySelector('.warning-pass');
	const createForm = document.querySelector('.customer__form');
	const formRow = document.querySelector('.form-account__row_pass');
	
	createForm.addEventListener('submit', (e) => {
		 e.preventDefault();
	
		 if (signInPassword.value !== confirmPassword.value) {
			  warningPass.textContent = 'Passwords do not match';
			  warningPass.style.opacity = '1';
			  warningPass.style.visibility = 'visible';
			 warningPass.style.transform = 'translate(0,0)';
			 formRow.style.marginBottom = '35px';
			 warningPass.classList.remove('strong-pass');
			 return;
		 } else if (signInPassword.value.length < 8 || confirmPassword.value.length < 8) {
			  warningPass.textContent = 'Password Too Short! (min 8 el)';
			  warningPass.style.opacity = '1';
			  warningPass.style.visibility = 'visible';
			 warningPass.style.transform = 'translate(0,0)';
			 formRow.style.marginBottom = '35px';
			 warningPass.classList.remove('strong-pass');
			 return;
		 } else {
			 warningPass.textContent = 'Strong Password!';
			 warningPass.classList.add('strong-pass');
			//  warningPass.style.backgroung = '#008000';
			// strongPass.style.opacity = '1';
			// strongPass.style.visibility = 'visible';
			//  strongPass.style.transform = 'translate(0,0)';
			//  warningPass.style.opacity = '0';
			//  warningPass.style.visibility = 'hidden';
			 formRow.style.marginBottom = '35px';
		
			
		 }
	});
	
	

});