const createCourseBookQuery = `mutation createCourseBook{
	 		createCourseBook(
	    	data:{
	    	title:"Пособие по уходу за метлой"
	    	author:"Неизвестен"
        subjectOnCourses:{connect:{id: "ck46x3iznsjmm0b662tsekqzz"}}
        
	    }) 
	    {
		    id
		    title
		    author
	  }
}`

mutation createTask{
	 		createTask(
	    	data:{
	    	completionDate:"2019-12-22"
	    	task:"Превратить навозного жука в большую пуговицу"
        subjectOnCourse:{connect:{id: "ck0rorfly0aoz0b59uvds4ev3"}}
	    }) 
	    {
		    id
		    task
		    completionDate
        subjectOnCourse {
          courseName
          subjectName
      		teacher{
            firstName
            lastName
          }
        }
	  }
}

{
  subjectOnCourses(where:{}) {
    subjectName
    courseName
    teacher{
      firstName
      lastName
    }
    students{
      id
      firstName
      lastName
    }
  }
}