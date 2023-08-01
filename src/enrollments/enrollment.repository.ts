import Enrollment, { IEnrollment } from "./schema/enrollments";
import { CreateEnrollmentDTO } from "./dtos/create_enrollment.dto";
import { UpdateEnrollmentDTO } from "./dtos/update_enrollment.dto";
import IEnrollmentRepository from "./enrollment-repository.interface";
import { IEnrollmentPayload } from "./interface/enrollments-payload-interface";

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
  getSingleEnrollmentByCourseAndUserId = async (
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

  getSingleEnrollment = async (id: string): Promise<IEnrollment | null> => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return null;
    else return enrollment;
  };

  deleteEnrollment = async (id: string): Promise<boolean> => {
    const result = await Enrollment.deleteOne({ _id: id });
    if (result.deletedCount === 1) return true;
    else return false;
  };

  getAllEnrollments = async (userId: string): Promise<IEnrollmentPayload[]> => {
    const enrollments = await Enrollment.find().populate("title", "", "").where({
      userId,
    });
    return [];
  };
}
