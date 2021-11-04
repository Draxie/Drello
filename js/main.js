let changeForm = document.querySelector('.change-form');
let groupNameInput = document.querySelector('#group-name-input');
let groupName = document.querySelector('#group-name');

groupNameInput.addEventListener('keydown', (e)=>{
    if (e.keyCode === 13) {
        Expand();
        groupNameInput.value='';
    }
})

function Expand(){
    SetName();
    changeForm.classList.toggle('expanded');
}

function SetName(){
    if(groupNameInput.value!=''){
        groupName.innerHTML = groupNameInput.value;
    }
}