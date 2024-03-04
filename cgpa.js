let courseCounters = {
    semester1: 1,
    semester2: 1,
    semester3: 1,
    semester4: 1,
    semester5: 1,
    semester6: 1,
    semester7: 1,
    semester8: 1,
};

document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn1")) {
        const semesterClass = target.semester;
        AddCourse(semesterClass);
    }
    else if(target.classList.contains("CalculateCGPA")){
        CalculateCGPA();
    }
    else {
        const semesterClass = target.semester;
        CalculateGPA(semesterClass)
    }
});

function AddCourse(semesterClass) {
    courseCounters[semesterClass]++;
    const newCourseSection = document.createElement("div");
    newCourseSection.className = "Course";
    newCourseSection.innerHTML = `
        <p>${courseCounters[semesterClass]}</p>
        <input class="coursename" value="" placeholder="Course ${courseCounters[semesterClass]}">
        <input class="credit" value="" id="credit">
                    <select>
                        <option value="10">O</option>
                        <option value="9">A+</option>
                        <option value="8">A</option>
                        <option value="7">B+</option>
                        <option value="6">B</option>
                        <option value="5">C</option>
                    </select>
    `;
    const semesterElement = document.querySelector(`.${semesterClass} .Courses`);
    semesterElement.appendChild(newCourseSection);
    const semester = document.querySelector(`.${semesterClass}`);
    const sec1Height = 250 + courseCounters[semesterClass] *50;
    semester.style.height = `${sec1Height}px`;
}

const semContainer = document.getElementById("main1");
let semCounter = 1;

function AddSem() {
    semCounter++;
    const newSem = document.createElement("div");
    const semesterClass = `semester semester${semCounter}`;
    newSem.className = semesterClass;
    newSem.innerHTML = `
        <h2>Semester ${semCounter}</h2>
        <div class="head">
            <h3>S.No</h3>
            <h3>Course Name</h3>
            <h3>Credit</h3>
            <h3>grade</h3>
        </div>
        <div class="Courses Course${semCounter}">
            <div class="Course">
                <p>1</p>
                <input class="coursename" value="" placeholder="Course 1">
                <input class="credit" value="">
                <select>
                    <option value="10">O</option>
                        <option value="9">A+</option>
                        <option value="8">A</option>
                        <option value="7">B+</option>
                        <option value="6">B</option>
                        <option value="5">C</option>
                </select>
            </div>
            <!-- More initial courses for the new semester -->
        </div>
        <div class="btn">
            <button class="btn1" onclick="AddCourse('semester${semCounter}')">
                Add Course
            </button>
            <button class="btn2" onclick="CalculateGPA('semester${semCounter}')">
                Calculate GPA
            </button>
        </div>
        <div class="gpa">
            <p id="weightgrade" class="gradeans"></p>
                <p id="creditans" class="creditanswer"></p>
                <p id="gpaans" class="ans"></p>
        </div>
    `;

    semContainer.appendChild(newSem);
}

function CalculateGPA(semester) {
    const courses = document.querySelectorAll(`.${semester} .Course`);
    let totalCredits = 0;
    let weightedGradePoints = 0;
    courses.forEach((course) => {
        const credit = parseFloat(course.querySelector('.credit').value);
        const gradeSelect = course.querySelector('select');
        const grade = parseFloat(gradeSelect.options[gradeSelect.selectedIndex].value);
        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            weightedGradePoints += credit * grade;
        }
    });
    if (totalCredits !== 0 && weightedGradePoints !== 0) {
        const gpa = (weightedGradePoints / totalCredits).toFixed(2);
        const gpaElement = document.querySelector(`.${semester} #gpaans`);
        const grade=document.querySelector(`.${semester} #weightgrade`);
        const c=document.querySelector(`.${semester} #creditans`);
        gpaElement.innerText = `GPA: ${gpa}`;
        c.innerText=`Credit: ${totalCredits}`;
        grade.innerText=`GradePoint: ${weightedGradePoints}`;
    }
}


function CalculateCGPA() {
    const semesters = document.querySelectorAll('.semester');
    let totalWeightedGradePoints = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
        const gpaElement = semester.querySelector('.gradeans');
        const c=semester.querySelector('.creditanswer');
        if (gpaElement) {
            const gpaText = gpaElement.innerText;
            const semesterGPA = parseFloat(gpaText.split(': ')[1]);
            const cText=c.innerText;
            const semesterCredit=parseFloat(cText.split(': ')[1]);
            totalWeightedGradePoints += semesterGPA;
            totalCredits += semesterCredit;

        }
    });
    const cgpa = (totalWeightedGradePoints / totalCredits).toFixed(2);
    const cgpaElement = document.getElementById('cgpans');
    cgpaElement.innerText = `CGPA: ${cgpa}`;
}

