import { CreateCourseDto } from "./dtos";
import { ICourseRepository } from "./interface/course_repository_interface";

export default class CourseService {
  // courseRepository: ICourseRepository;
  // constructor(courseRepository: ICourseRepository) {
  //   this.courseRepository = courseRepository;
  // }

  /**
   * createCourse
   */
  public createCourse = async (dto: CreateCourseDto) => {};

  /**
   * updateCourse
   */
  public updateCourse() {}

  /**
   * getCourseById
   */
  public getCourseById() {}

  /**
   * deleteCourse
   */
  public deleteCourse() {}
}
