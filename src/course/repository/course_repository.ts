import { ICourseRepository } from "../interface/course_repository_interface";
import Course, { ICourse } from "../schema/course";

export class CourseRepository implements ICourseRepository {
  async create(course: ICourse): Promise<ICourse> {
    return Course.create(course);
  }

  async findById(id: string): Promise<ICourse | null> {
    return Course.findById(id).exec();
  }

  async findAll(): Promise<ICourse[]> {
    return Course.find().exec();
  }
}
