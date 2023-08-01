import Enrollment, { IEnrollment } from "../user/schema/enrollments";
import { CreateEnrollmentDTO } from "./dtos/create_enrollment.dto";
import { UpdateEnrollmentDTO } from "./dtos/update_enrollment.dto";
import IEnrollmentRepository from "./enrollment-repository.interface";

export default class EnrollmentRepository implements IEnrollmentRepository {
  updateEnrollmentStatus = async (
    userId: string,
    dto: UpdateEnrollmentDTO
  ): Promise<IEnrollment | null> => {
    const response = await Enrollment.findOne({
      courseId: dto.courseId,
      chapterId: dto.chapterId,
      userId,
    });
    if (!response) {
      return null;
    }
    return response.toJSON();
  };
  getSingleEnrollment = async (
    userId: string,
    courseId: string
  ): Promise<IEnrollment | null> => {
    const response = await Enrollment.findOne({
      userId: userId,
      courseId: courseId,
    }).exec();
    if (!response) {
      return null;
    } else {
      return response;
    }
  };
  async createEnrollment(
    dto: CreateEnrollmentDTO,
    userId: string
  ): Promise<IEnrollment | null> {
    const data = new Enrollment({
      chapterId: dto.chapterId,
      courseId: dto.courseId,
      userId,
    });
    const response = await data.save();
    return response.toJSON();
  }
  getAllUserEnrollments = async (userId: string): Promise<IEnrollment[]> => {
    const response = await Enrollment.find({ _id: userId }).exec();
    return response.map((e) => e.toJSON());
  };
}
