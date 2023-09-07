import logger from "../../utils/logger";
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
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      logger.debug(`No Course found to be deleted`);
    } else {
      logger.debug(`Successfully deleted course with id ${id}`);
    }
  };
  create = async (
    dto: CreateCourseDto,
    tutorId: string,
    backgroundImageId: string
  ): Promise<ICourse> => {
    const data = new Course({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      type: dto.type,
      instructorId: tutorId,
      backgroundImage: backgroundImageId,
    });
    const createdCourse = await data.save();

    return createdCourse;
  };

  async findById(id: string): Promise<ICourse | null> {
    return Course.findById(id).exec();
  }

  findAll = async (): Promise<ICourse[]> => {
    const courses = await Course.find().exec();
    return Object.values(courses);
  };
}
