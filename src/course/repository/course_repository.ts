import { CreateCourseDto } from "../dtos";
import { ICourseRepository } from "../interface/course_repository_interface";
import Course, { ICourse } from "../schema/course";

export class CourseRepository implements ICourseRepository {
  findAllByCreatorId = async (id: string): Promise<ICourse[]> => {
    const response = await Course.find({
      instructorId: id,
    }).exec();
    return response;
  };
  deleteById = async (id: string): Promise<void> => {
    await Course.deleteOne({ id }).exec();
  };
  async create(course: CreateCourseDto): Promise<ICourse> {
    const response = await Course.create({
      course,
    });
    return response;
  }

  async findById(id: string): Promise<ICourse | null> {
    return Course.findById(id).exec();
  }

  async findAll(): Promise<ICourse[]> {
    return Course.find().exec();
  }
}
