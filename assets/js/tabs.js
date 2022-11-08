const TABS = [...document.querySelectorAll('div.tabs ul li')];
const CONTENTS = [...document.querySelectorAll('div.tab-content')];
const ACTIVE_CLASS = 'is-active';

const updateActiveTab = (selected) => {
    let tabs_group = selected.substring(0, selected.lastIndexOf('-'));
    TABS.forEach((tab) => {
        let data = tab.getAttribute('data-tab');
        if (tab && data.startsWith(tabs_group) && tab.classList.contains(ACTIVE_CLASS)) {
            tab.classList.remove(ACTIVE_CLASS);
        }
        if (data === selected) {
            tab.classList.add(ACTIVE_CLASS);
        }
    });
}

const updateActiveContent = (selected) => {
    let tabs_group = selected.substring(0, selected.lastIndexOf('-'));
    CONTENTS.forEach((content) => {
        let data = content.getAttribute('data-content');
        if (content && data.startsWith(tabs_group) && content.classList.contains(ACTIVE_CLASS)) {
            content.classList.remove(ACTIVE_CLASS);
        }
        if (data === selected) {
            content.classList.add(ACTIVE_CLASS);
        }
    });
}

window.addEventListener('load', (event) => {
    TABS.forEach((tab) => {
      tab.addEventListener('click', (event) => {
          event.preventDefault();
          let selected = tab.getAttribute('data-tab');
          updateActiveTab(selected);
          updateActiveContent(selected);
      });
    });
});
