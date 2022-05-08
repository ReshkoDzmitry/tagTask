const inpNameTag = document.getElementById('input-name-tag');
const btnAddNameTag = document.getElementById('button-add-tag');
const listTags = document.getElementById('list-tags');
const checkView = document.getElementById('box-mode');

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
            <input class='checkbox-completed' onclick='changeTag(${index})' type='checkbox' ${tag.completed ? 'checked' : ''}>
            <div class='tag-name'>${tag.description}</div>
            <div class='tag-control'> 
                <button class='btn-delete' onclick="deleteTag(${index})">x</button>
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
    updateLocalStorage();
    updateTagList();
}

btnAddNameTag.addEventListener('click', () => {
    tags.push(new Tag(inpNameTag.value));
    updateLocalStorage();
    updateTagList();
    inpNameTag.value = '';
});

const deleteTag = (index) => {
    tags.splice(index, 1);
    updateLocalStorage();
    updateTagList();
}

const blockListTags = document.getElementById('list-tags');

const changeViewMode = () => {
    checkView.checked ? blockListTags.classList.add("disabledTagList") : blockListTags.classList.remove("disabledTagList");
}
