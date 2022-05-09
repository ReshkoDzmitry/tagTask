const inpNameTag = document.getElementById('inputNameTag');
const btnAddNameTag = document.getElementById('buttonAddTag');
const checkView = document.getElementById('boxMode');
const listTags = document.getElementById('listTags');


let tags;
!localStorage.tags ? tags = [] : tags = JSON.parse(localStorage.getItem('tags'));

let tagItems = [];

function Tag(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (tag, index) => {
    return `
<div>
<div class="tag-item ${tag.completed ? 'checked' : ''}">
            <input class='tag-item__checkbox-completed' onclick='changeTag(${index})' type='checkbox' ${tag.completed ? 'checked' : ''}>
            <div class='tag-item__div-tag-name'>${tag.description}</div>
            <div class='tag-control'> 
                <button class='tag-control__btn-delete' onclick="deleteTag(${index})">x</button>
            </div>
        </div>
</div>`
}

const updateTagList = () => {
    listTags.innerHTML = '';
    if (tags.length > 0) {
        tags.forEach((item, index) => {
            listTags.innerHTML += createTemplate(item, index)
        });
        tagItems = document.querySelectorAll('.tag-item');
    }
}

updateTagList();

const allFunctions = () => {
    updateLocalStorage();
    updateTagList();
}

const updateLocalStorage = () => {
    localStorage.setItem('tags', JSON.stringify(tags));
}

const changeTag = (index) => {
    tags[index].completed = !tags[index].completed;
    if (tags[index].completed) {
        tagItems[index].classList.add('checked');
    } else {
        tagItems[index].classList.remove('checked');
    }
    allFunctions();
}

btnAddNameTag.addEventListener('click', () => {
    tags.push(new Tag(inpNameTag.value));
    allFunctions();
    inpNameTag.value = '';
});

const deleteTag = (index) => {
    tags.splice(index, 1);
    allFunctions();
}

const changeViewMode = () => {
    checkView.checked ? listTags.classList.add("list-tags_disabled") : listTags.classList.remove("list-tags_disabled");
    checkView.checked ? inpNameTag.setAttribute('disabled', 'true') : inpNameTag.removeAttribute('disabled');
    checkView.checked ? btnAddNameTag.setAttribute('disabled', 'true') : btnAddNameTag.removeAttribute('disabled');
}
