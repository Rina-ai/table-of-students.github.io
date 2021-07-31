(() => {
  const date = (new Date(Date.now())).toISOString().slice(0, -14);
  const dateYear = (new Date()).getFullYear();
  let listOfStudents = [];

  // создаем заголовок
  function createTitle(title) {
    let mainTitle = document.createElement('h1');
    mainTitle.innerHTML = title;
    return mainTitle;
  }

  // создаем форму для добавления новых студентов
  function createFormAddNew() {
    const form = document.createElement('form');
    form.classList.add('form');
    const titleForm = document.createElement('h2');
    titleForm.textContent = 'Добавить нового студента';
    form.append(titleForm);
    const row = document.createElement('div');
    row.classList.add('form-row');

    function createInput(valuePlaceholder, id) {
      const inputWrapper = document.createElement('div');
      inputWrapper.classList.add('col-md-4', 'mb-3');

      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.textContent = valuePlaceholder;

      const input = document.createElement('input');
      input.classList.add('form-control');
      input.id = id;
      input.setAttribute('data-validate-field', id);
      input.type = 'text';
      input.placeholder = valuePlaceholder;

      inputWrapper.append(label);
      inputWrapper.append(input);
      row.append(inputWrapper);
      form.append(row);

      return {
        label,
        input
      };
    }

    const inputName = createInput('Имя', 'firstname');
    const inputSurname = createInput('Фамилия', 'surname');
    const inputPatronymic = createInput('Отчество', 'patronymic');
    const inputBirthday = createInput('Дата рождения', 'birthday');
    const inputYearsOfStudy = createInput('Год начала обучения', 'study');
    const inputFaculty = createInput('Факультет', 'faculty');
    inputBirthday.input.type = 'date';
    inputYearsOfStudy.input.type = 'number';
    inputBirthday.input.setAttribute('max', date);
    inputBirthday.input.setAttribute('min', '1900-01-01');
    inputYearsOfStudy.input.setAttribute('max', dateYear);
    inputYearsOfStudy.input.setAttribute('min', '2000');

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'Добавить';
    form.append(btn);

    return {
      form,
      inputName,
      inputSurname,
      inputPatronymic,
      inputBirthday,
      inputYearsOfStudy,
      inputFaculty,
      btn
    };
  }

  // создаем поля для фильтрации таблицы 
  function createInputSearchContainer() {
    const titleSearch = document.createElement('h3');
    titleSearch.textContent = 'Фильтры';
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('block-filter');
    const wrapperSearch = document.createElement('div');
    wrapperSearch.classList.add('row', 'input-search');

    function createInputSearch(idSearch, titleSearch) {
      const inputWrapperSearch = document.createElement('div');
      inputWrapperSearch.classList.add('col');

      const labelSearch = document.createElement('label');
      labelSearch.dataset.for = idSearch;
      labelSearch.textContent = titleSearch;

      const inputSearch = document.createElement('input');
      inputSearch.classList.add('form-control');
      inputSearch.id = idSearch;
      inputSearch.type = 'text';

      inputWrapperSearch.append(labelSearch);
      inputWrapperSearch.append(inputSearch);
      wrapperSearch.append(inputWrapperSearch);

      return {
        labelSearch,
        inputSearch
      }
    }

    const inputSearchFullName = createInputSearch('search-fullname', 'ФИО');
    const inputSearchFaculty = createInputSearch('search-faculty', 'Факультет');
    const inputSearchStartYear = createInputSearch('search-start-year', 'Год начала обучения');
    const inputSearchEndYear = createInputSearch('search-end-year', 'Год окончания обучения');

    inputSearchStartYear.inputSearch.type = 'number';
    inputSearchStartYear.inputSearch.setAttribute('max', dateYear);
    inputSearchStartYear.inputSearch.setAttribute('min', '2000');
    inputSearchEndYear.inputSearch.type = 'number';
    inputSearchEndYear.inputSearch.setAttribute('max', dateYear);
    inputSearchEndYear.inputSearch.setAttribute('min', '2004');

    const btnSearch = document.createElement('button');
    btnSearch.classList.add('btn', 'btn-search', 'btn-primary');
    btnSearch.textContent = 'Поиск';
    inputContainer.append(titleSearch);
    inputContainer.append(wrapperSearch);
    inputContainer.append(btnSearch);

    return {
      inputContainer,
      inputSearchFullName,
      inputSearchFaculty,
      inputSearchStartYear,
      inputSearchEndYear,
      btnSearch
    }
  }

  function createTable() {
    const table = document.createElement('table');
    table.classList.add('table');
    table.id = 'table';

    const tHead = document.createElement('thead');
    const tOneRow = document.createElement('tr');
    const tCells0 = document.createElement('th');
    const tCells1 = document.createElement('th');
    const tBtnFullName = document.createElement('button');
    const tCells2 = document.createElement('th');
    const tBtnFaculty = document.createElement('button');
    const tCells3 = document.createElement('th');
    const tBtnBirth = document.createElement('button');
    const tCells4 = document.createElement('th');
    const tBtnStudy = document.createElement('button');
    tBtnFullName.classList.add('table__full-name', 'btn', 'btn-light');
    tBtnFullName.textContent = 'ФИО студента';
    tBtnFaculty.classList.add('table__faculty', 'btn', 'btn-light');
    tBtnFaculty.textContent = 'Факультет';
    tBtnBirth.classList.add('table__date-of-birth', 'btn', 'btn-light');
    tBtnBirth.textContent = 'Дата рождения (возраст)';
    tBtnStudy.classList.add('table__years-of-study', 'btn', 'btn-light');
    tBtnStudy.textContent = 'Годы обучения (номер курса)';

    const tBody = document.createElement('tbody');
    tBody.classList.add('table__tbody');

    tCells1.append(tBtnFullName);
    tCells2.append(tBtnFaculty);
    tCells3.append(tBtnBirth);
    tCells4.append(tBtnStudy);
    tOneRow.append(tCells0);
    tOneRow.append(tCells1);
    tOneRow.append(tCells2);
    tOneRow.append(tCells3);
    tOneRow.append(tCells4);
    tHead.append(tOneRow);
    table.append(tHead);
    table.append(tBody);

    return {
      table,
      tBtnFullName,
      tBtnFaculty,
      tBtnBirth,
      tBtnStudy,
      tBody
    }
  }

  // строки таблицы
  function createdNewStudent(numberRow, fullNameValue, facultyValue, birthValue, studyValue) {
    // findCardsList();
    const rowNew = document.createElement('tr');
    const cellsNumber = document.createElement('td');
    const cellsFullName = document.createElement('td');
    const cellsFaculty = document.createElement('td');
    const cellsBirth = document.createElement('td');
    const cellsStudy = document.createElement('td');
    rowNew.classList.add('tbody-tr');
    cellsNumber.innerHTML = numberRow;
    cellsFullName.innerHTML = fullNameValue;
    cellsFaculty.innerHTML = facultyValue;
    cellsBirth.innerHTML = birthValue;
    cellsStudy.innerHTML = studyValue;
    rowNew.append(cellsNumber);
    rowNew.append(cellsFullName);
    rowNew.append(cellsFaculty);
    rowNew.append(cellsBirth);
    rowNew.append(cellsStudy);
    return rowNew;
  }

  // удаляем строки в таблице, чтобы ее заново 'перерисовать'
  function findCardsList() {
    let earlyCardsList = document.querySelectorAll('.tbody-tr');
    for (const tr of earlyCardsList) {
      if (tr) {
        tr.remove();
      }
    }
  }

  // вычисляем возрост 
  function calculationAge(dateValue) {
    let age = ((new Date().getTime() - new Date(dateValue)) / (24 * 3600 * 365.25 * 1000)) | 0;
    return age;
  }

  // вычисляем курс
  function calculationСourse(startYearValue) {
    let сourse = (new Date()).getFullYear() - startYearValue;
    if (сourse > 4) сourse = "Окончил";
    if ((new Date()).getMonth() > 9) сourse = "Окончил";
    return сourse;
  }

  // функция фильтрация по возрастанию 
  function ascendingFiltering(numberCell) {
    let sortedRows = Array.from(table.rows)
      .slice(1)
      .sort((rowA, rowB) => {
        if (numberCell === 3) {
          return rowA.cells[numberCell].innerHTML - rowB.cells[numberCell].innerHTML ? 1 : -1;
        } else {
          return rowA.cells[numberCell].innerHTML > rowB.cells[numberCell].innerHTML ? 1 : -1
        }
      });
    table.tBodies[0].append(...sortedRows);
  };

  // функция фильрации по поиску
  function filterItems(fullnameSearch, facutySearch, startYearSearch, endYearSearch) {
    return Array.from(table.rows)
      .slice(1)
      .filter((row) => {
        if ((!row.cells[1].textContent.toLowerCase().includes(fullnameSearch)) || (!row.cells[2].textContent.toLowerCase().includes(facutySearch)) || (!row.cells[4].textContent.toLowerCase().split(/-| /).shift().includes(startYearSearch)) || (!row.cells[4].textContent.toLowerCase().split(/-| /).splice(1, 1).shift().includes(endYearSearch))) {
          row.style.display = 'none'
        } else {
          row.style.display = '';
        }
      });
  }

  let validateForms = function (tbodyCont, nowDate, nowYear) {
    new window.JustValidate('form', {
      rules: {
        firstname: {
          required: true
        },
        surname: {
          required: true
        },
        patronymic: {
          required: true
        },
        birthday: {
          required: true,
          function: (dataValue) => {
            dataValue = nowDate.value;
            return ('1900-01-01' <= dataValue && dataValue <= date);
          }
        },
        study: {
          required: true,
          function: (yearValue) => {
            yearValue = nowYear.value;
            return ('2000' <= yearValue && yearValue <= dateYear);
          }
        },
        faculty: {
          required: true
        },
      },
      messages: {
        firstname: {
          required: 'Введите имя'
        },
        surname: {
          required: 'Введите фамилию'
        },
        patronymic: {
          required: 'Введите отчество'
        },
        birthday: {
          required: 'Введите дату рождения',
          function: `Дата рождения должна быть меньше 01.01.1900 и больше ` + date.split('-').reverse().join('.')
        },
        study: {
          required: 'Введите год обучения',
          function: 'Год обучения должен быть больше 2000 г. и меньше ' + dateYear + ' г.'
        },
        faculty: {
          required: 'Введите факультет'
        },
      },
      submitHandler: function (form) {
        listOfStudents.push({
          firstName: document.getElementById('firstname').value.trim(),
          lastName: document.getElementById('surname').value.trim(),
          patronymic: document.getElementById('patronymic').value.trim(),
          faculty: document.getElementById('faculty').value.trim(),
          dateOfBirth: document.getElementById('birthday').value.trim().split('-').reverse().join('.'),
          yearsOfStudy: document.getElementById('study').value.trim(),
        });
        findCardsList();
        for (let i = 0; i < listOfStudents.length; i++) {
          numberRow = i + 1;
          fullNameValue = listOfStudents[i].lastName + ' ' + listOfStudents[i].firstName + ' ' + listOfStudents[i].patronymic;
          facultyValue = listOfStudents[i].faculty;
          birthValue = listOfStudents[i].dateOfBirth + ' (' + calculationAge(listOfStudents[i].dateOfBirth) + ')';
          studyValue = listOfStudents[i].yearsOfStudy + '-' + (Number(listOfStudents[i].yearsOfStudy) + 4) + ' (' + calculationСourse(listOfStudents[i].yearsOfStudy) + ')';

          let newStudent = createdNewStudent(numberRow, fullNameValue, facultyValue, birthValue, studyValue);
          tbodyCont.append(newStudent);
        }
        form.reset();
      }
    });
  }

  function createListStudent(container, title) {
    let mainTitle = createTitle(title);
    let formAddNew = createFormAddNew();
    let filterContainer = createInputSearchContainer();
    let table = createTable();

    container.append(mainTitle);
    container.append(formAddNew.form);
    container.append(filterContainer.inputContainer);
    container.append(table.table);


    validateForms(table.tBody, formAddNew.inputBirthday.input, formAddNew.inputYearsOfStudy.input);
    table.tBtnFullName.addEventListener('click', () => {
      ascendingFiltering(1);
    });

    table.tBtnFaculty.addEventListener('click', () => {
      ascendingFiltering(2);
    });

    table.tBtnBirth.addEventListener('click', () => {
      ascendingFiltering(3);
    });

    table.tBtnStudy.addEventListener('click', () => {
      ascendingFiltering(4);
    });

    // фильтрация по введенным данным
    filterContainer.btnSearch.addEventListener('click', () => {
      filterItems(filterContainer.inputSearchFullName.inputSearch.value, filterContainer.inputSearchFaculty.inputSearch.value, filterContainer.inputSearchStartYear.inputSearch.value, filterContainer.inputSearchEndYear.inputSearch.value);
    });
  }

  window.createListStudent = createListStudent;
})();