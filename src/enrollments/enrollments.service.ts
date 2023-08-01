import { ICourseRepository } from "../course/interface/course_repository_interface";
import { CourseRepository } from "../course/repository/course_repository";
import { ForbiddenRequestError, NotFoundRequestError } from "../errors";
import HttpException from "../errors/base-http-exception";
import { CreateEnrollmentDTO } from "./dtos/create_enrollment.dto";
import IEnrollmentRepository from "./enrollment-repository.interface";
import EnrollmentRepository from "./enrollment.repository";

export default class EnrollmentsService {
  private enrollmentsRepository: IEnrollmentRepository =
    new EnrollmentRepository();
  private coursesRepository: ICourseRepository = new CourseRepository();

  createEnrollment = async (dto: CreateEnrollmentDTO, userId: string) => {
    const enrollmentExists =
      await this.enrollmentsRepository.getSingleEnrollmentByCourseAndUserId(
        userId,
        dto.courseId
      );
    if (enrollmentExists) {
      throw new ForbiddenRequestError(
        "A user can not enroll for a course twice."
      );
    }
    const course = await this.coursesRepository.findById(dto.courseId);
    if (!course) {
      throw new NotFoundRequestError("Course with this id does not exist.");
    }
    //TODO: Check if course is free
    // if (course.price > 0.0) {
    // }
    const response = await this.enrollmentsRepository.createEnrollment(
      dto,
      userId
    );
    if (!response) {
      throw new HttpException(
        500,
        "failed to create enrollment for this course."
      );
    }
    return response;
  };

  cancelEnrollment = async (enrollmentId: string, userId: string) => {
    const enrollment = await this.enrollmentsRepository.getSingleEnrollment(
      enrollmentId
    );
    if (!enrollment) {
      throw new NotFoundRequestError("Enrollment not found.");
    }
    if (enrollment.userId !== userId) {
      throw new NotFoundRequestError("User did not enroll for this course");
    }
    const result = await this.enrollmentsRepository.deleteEnrollment(
      enrollmentId
    );
    if (!result) {
      throw new HttpException(500, "failed to delete enrollment.");
    }
    return "successfully deleted enrollment.";
  };

  getAllEnrollments = async (userId: string) => {
    const result = await this.enrollmentsRepository.getAllEnrollments(userId);
    return result;
  };
}
