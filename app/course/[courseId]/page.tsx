"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book, Clock, PlayCircle, TrendingUp, Lock, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { coursesTable } from "@/config/schema";

// Types
interface Topic {
  topic: string;
  content: string;
}

interface ChapterContent {
  chapterName: string;
  topics: Topic[];
}

interface CourseContentItem {
  courseData: ChapterContent;
}

interface Course {
   id: number;
   courseId: string;
   name: string;
   description: string;
   category: string;
   level: string;
   bannerImageUrl: string;
   courseContent: CourseContentItem[];
   includeVideo: boolean;
   noOfChapter: number;
   userEmail: string;
}

const Course = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false); 

  useEffect(() => {
    if (params?.courseId) {
      GetCourse();
    }
  }, [params?.courseId]);

  const GetCourse = async () => {
    try {
      const result = await axios.get(`/api/courses?courseId=${params.courseId}`);
      setCourse(result.data);
      console.log(result.data);
    } catch (error) {
       console.error("Error fetching course:", error);
    } finally {
       setLoading(false);
    }
  };

  if (loading) {
     return (
        <div className="flex h-screen items-center justify-center">
           <Loader2 className="animate-spin w-10 h-10 text-primary" />
        </div>
     );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <Button asChild className="mt-4">
             <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold font-serif leading-tight text-gray-900 dark:text-gray-100">
            {course.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {course.description}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
             <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <Book className="w-4 h-4 text-purple-500"/>
                <span>{course.noOfChapter} Chapters</span>
             </div>
             <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-500"/>
                <span>{course.level}</span>
             </div>
             <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-blue-500"/>
                 {/* Duration is not directly available on root, leaving out or estimating could be an option but safer to omit if not sure */}
                 <span>{course.category}</span>
             </div>
          </div>

          <div className="pt-4">
             {/* TODO: Add enrollment logic here later */}
             <Button className="w-full md:w-auto text-lg px-8 py-6" asChild>
                <Link href={`/dashboard`}>Start Learning</Link>
             </Button>

              <p className="text-xs text-gray-400 mt-2">
                 * Enrollment is free for beta users.
              </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border border-slate-200 dark:border-slate-700">
           <Image
             src={course.bannerImageUrl || "/placeholder.png"}
             alt={course.name}
             fill
             className="object-cover transition-transform hover:scale-105 duration-700"
             priority
           />
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="mt-16 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50"></div>
        <h3 className="text-2xl font-bold mb-8 mt-8">Course Curriculum</h3>
        
        <div className="space-y-8 max-w-4xl mx-auto">
           {course.courseContent?.map((chapterItem, index) => (
             <div key={index} className="border rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 border-b">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg">
                         {index + 1}
                      </div>
                      <div>
                         <h4 className="font-bold text-2xl text-gray-900 dark:text-white">
                            {chapterItem.courseData.chapterName}
                         </h4>
                         <p className="text-sm text-gray-500 mt-1">
                             {chapterItem.courseData.topics?.length || 0} Topics
                         </p>
                      </div>
                   </div>
                </div>
                
                {/* Full Content Rendering */}
                <div className="p-6 space-y-8">
                   {chapterItem.courseData.topics?.map((topic, i) => (
                      <div key={i} className="prose dark:prose-invert max-w-none">
                         <h5 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {topic.topic}
                         </h5>
                         {/* Render HTML Content */}
                         <div 
                           className="text-gray-700 dark:text-gray-300 leading-relaxed"
                           dangerouslySetInnerHTML={{ __html: topic.content }} 
                         />
                         {/* Divider between topics */}
                         {i < (chapterItem.courseData.topics?.length || 0) - 1 && (
                            <hr className="my-8 border-slate-200 dark:border-slate-700" />
                         )}
                      </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
