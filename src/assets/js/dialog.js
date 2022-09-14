window.openDialog = (options) => {
    options = typeof options === 'object' ? options : {};
	const wrap = document.querySelector('.c-dialog-overlay');
    if(!wrap) { return }
    const dialog = wrap.querySelector('.c-dialog');
    const dialogBody = wrap.querySelector('.c-dialog__body');
    const closeBtn = wrap.querySelector('.c-dialog__close');

    const listenKeys = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            wrap.dialogClose();
        } else if (e.key === 'Tab' && e.target === closeBtn){
            e.preventDefault();
            dialog.focus();
        } else if (e.key === 'Tab' && e.shiftKey && e.target === dialog){
            e.preventDefault();
            closeBtn.focus();
        }
    };

	if(!wrap.dialogClose){
		wrap.dialogClose = () => {
			wrap.classList.add('m-closing');
            document.body.classList.remove('dialog-opened');
            document.body.removeEventListener('keydown', listenKeys);
            if (options.back) {
                options.back.focus();
            }

			setTimeout(() => {
                wrap.className = 'c-dialog-overlay u-hidden';
				dialogBody.innerHTML = '';
			}, 300);
        }
		wrap.addEventListener('click', (e) => {
            if(e.target === e.currentTarget && wrap.dialogOptions.overlayClose !== false){
                wrap.dialogClose();
            }
        });
		
		closeBtn.addEventListener('click', () => {
			wrap.dialogClose();
        });
        
		document.body.appendChild(wrap);
    }

    wrap.dialogOptions = options;
	dialog.className = 'c-dialog ' + (options.className || '');
    dialogBody.innerHTML = options.html || '';
    wrap.querySelector('#dialog-title').innerHTML = options.title || '';
    [].forEach.call(wrap.querySelectorAll('.js-dialog-close'), (btn) => {
        btn.addEventListener('click', () => {
			wrap.dialogClose();
        });
    });
    wrap.classList.remove('u-hidden');
    document.body.classList.add('dialog-opened');
    document.body.addEventListener('keydown', listenKeys);

	setTimeout(() => {
		wrap.classList.add('m-ready');
        dialog.focus();
	}, 0);
};
