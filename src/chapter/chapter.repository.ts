import { ICourseRepository } from "../course/interface/course_repository_interface";
import { CourseRepository } from "../course/repository/course_repository";

// import { NotFoundRequestError } from "../errors";
import CreateChapterDto from "./dtos/create-chapter.dto";
import Chapter, { IChapter } from "./schema/chapter";
export default class ChapterRepository {
  private courseRepository: ICourseRepository = new CourseRepository();
  /*
    Create a new Chapter under a specific course.
    
*/
  createChapter = async (dto: CreateChapterDto): Promise<IChapter | null> => {
    const courseExists = await this.courseRepository.findById(dto.course_id);
    if (!courseExists) {
      //   throw new NotFoundRequestError("No course found with this id");
      return null;
    }
    const data = new Chapter({
      courseId: dto.course_id,
      title: dto.title,
      content: dto.content,
      backgroundImage: dto.background_image,
    });
    const result = await data.save();
    return result.toJSON();
  };
}
