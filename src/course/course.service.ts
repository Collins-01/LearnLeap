import HttpException from "../errors/base-http-exception";
import { UserRole } from "../user/schema/user";
import { CreateCourseDto } from "./dtos";
import { ICourseRepository } from "./interface/course_repository_interface";
import { CourseRepository } from "./repository/course_repository";
import { ICourse } from "./schema/course";
import logger from "../utils/logger";
import FileService from "../files/file.service";
import { FileType, IFile } from "../files/schema/file";

export default class CourseService {
  courseRepository: ICourseRepository = new CourseRepository();
  fileService = new FileService();

  /**
   * createCourse
   */
  public createCourse = async (
    dto: CreateCourseDto,
    instructorId: string,
    media: Express.Multer.File
  ) => {
    let mediaFile: IFile;
    try {
      logger.debug(`Creating Course with data :: ${JSON.stringify(dto)}`)
      mediaFile = await this.fileService.uploadFile(media, FileType.IMAGE);
      const response = await this.courseRepository.create(
        {
          title: dto.title,
          description: dto.description,
          price: dto.price,
          type: dto.type,
        },
        instructorId,
        mediaFile._id
      );
      logger.debug(`Newly created course... ${response.toJSON()}`);
      const data = {
        message: `successfully created course titled ${dto.title}`,
        ...response.toJSON(),
      };
      return data;
    } catch (error) {
      console.log(`Error creating course:: ${JSON.stringify(error)}`);
      logger.error("This is an error message.", {
        additionalData: JSON.stringify(error)
      });

      throw new HttpException(500, `${JSON.stringify(error)}`);
      // Catch and Handle MongoDB Errors
    }
  };

  /**
   * updateCourse
   */
  public updateCourse() {}

  /**
   * getCourseById
   */
  public getCourseById = async (id: string) => {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new HttpException(404, "Course not found");
    }
    return {
      message: "successfully fetched course.",
      data: {
        ...course.toJSON(),
      },
    };
  };

  /**
   * deleteCourse
   */
  public deleteCourse = async (id: string, creatorId: string) => {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new HttpException(404, `Not course found with this id ${id}`);
    }
    if (course.instructorId !== creatorId) {
      throw new HttpException(
        403,
        `User can only delete course that was creted by the user.`
      );
    }
    await this.courseRepository.deleteById(id);
    return {
      message: `Successfully deleted course with id ${id}`,
    };
  };

  /**
   * getAllCourses
   */
  public getAllCourses = async () => {
    const response = await this.courseRepository.findAll();
    return {
      message: `Successfully retrieved all courses`,
      data: {
        ...response,
      },
    };
  };

  /**
   * getAllCoursesByInstructorId
   */
  public getAllCoursesByInstructorId = async (id: string) => {
    const response = await this.courseRepository.findAllByCreatorId(id);
    return {
      message: `Successfully retrieved all courses created by instructor`,
      data: {
        ...response,
      },
    };
  };
}
