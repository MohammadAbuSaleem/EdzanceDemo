<?php

$api->any('class/{action?}/{parts?}/{id?}/{skp?}/{tk?}', ['uses' => 'testController@test']);

return [
    // 'readClass'        => ['class/{id}', 'classRead', 'get' /*,'class.read'*/], //done
    'addClass'         => ['add-class', 'classAdd', 'post', 'class.add'], //done
    'enterClass'       => ['classEnter', 'classEnter', 'post', 'class.enter'], //done
    'uploadHomeWork'   => ['upload-homework', 'HomeWorkUpload', 'post', 'class.homework.upload'], //done
    'uploadFile'       => ['upload-file', 'Uploadfl', 'post', 'class.file.upload'], //done
    // 'uploadBook'       =>['upload-book'      ,'BookUpload'      ,'post'   ,'class.book.upload'       ],
    // 'uploadSyllabus'=>['upload-syllabus'  ,'SyllabusUpload'  ,'post'   ,'class.syllabus.upload'   ],
    // 'addPost'       =>['add-post'         ,    'postAdd'        ,'post'   ,'class.post.add'         ],
    // 'editPost'       =>['edit-post'        ,'postEdit'        ,'post'   ,'class.post.edit'         ],
    // 'delPost'       =>['delete-post'      ,'postDelete'      ,'post'   ,'class.post.delete'       ],
    // 'readPost'       =>['rd-pt/{i}/{s}/{t}',    'postRead'       ,'get'    ,'class.post.read'        ],
    // 'readComment'   =>['read-comment'     ,'commentRead'     ,'get'    ,'class.comment.read'      ],
    // 'addComment'       =>['add-comment'      ,'commentAdd'      ,'post'   ,'class.comment.add'       ],
    // 'editComment'   =>['edit-comment'     ,'commentEdit'     ,'post'   ,'class.comment.edit'      ],
    // 'deleteComment' =>['delete-comment'   ,'commentDelete'   ,'post'   ,'class.comment.delete'    ],
    'readFile'         => ['read-file/{id}/{s?}/{t?}', 'fileRead', 'get', 'class.files.read'], //done
    'addFile'          => ['add-file', 'fileAdd', 'post', 'class.files.add'], //done
    'editFile'         => ['edit-file', 'fileEdit', 'post', 'class.files.edit'], //done
    'deleteFile'       => ['delete-file', 'fileDelete', 'post', 'class.files.delete'],
    'readHomework'     => ['rd-hk/{i}/{s}/{t}', 'homeWorkRead', 'get', 'class.homework.read'], //done
    'addHomework'      => ['add-homework', 'homeWorkAdd', 'post', 'class.homework.add'], //done
    'editHomework'     => ['edit-homework', 'homeWorkEdit', 'post', 'class.homework.edit'], //done
    'deleteHomework'   => ['delete-homework', 'homeWorkDelete', 'post', 'class.homework.delete'],
    'readExam'         => ['rd-em/{i}/{s}/{t}', 'examRead', 'get', 'class.exam.read'], //done
    'addExam'          => ['add-exam', 'examAdd', 'post', 'class.exam.add'], //done
    'editExam'         => ['edit-exam', 'examEdit', 'post', 'class.exam.edit'], //done
    'deleteExam'       => ['delete-exam', 'examDelete', 'post', 'class.exam.delete'],
    'addInformation'   => ['add-info/{i}', 'informationAdd', 'post', 'class.information.add'], //done
    'readChat'         => ['read-chat', 'chatRead', 'get', 'class.chat.read'],
    'addChat'          => ['add-chat', 'chatAdd', 'post', 'class.chat.add'],
    'readStudent'      => ['read-student/{i}', 'studentRead', 'get', 'class.student.read'], //done
    'addStudent'       => ['add-student', 'studentAdd', 'post', 'class.student.add'],
    'editStudent'      => ['edit-student', 'studentEdit', 'post', 'class.student.edit'],
    'deleteStudent'    => ['delete-student', 'studentDelete', 'post', 'class.student.delete'],
    'readMark'         => ['raed-marks', 'marksRead', 'get', 'class.marks.read'],
    'addMark'          => ['add-marks', 'marksAdd', 'post', 'class.marks.add'],
    'editMark'         => ['edit-marks', 'marksEdit', 'post', 'class.marks.edit'],
    'deleteMark'       => ['delete-marks', 'marksDelete', 'post', 'class.marks.delete'],
    'readAttendence'   => ['read-attendance', 'attendanceRead', 'get', 'class.attendance.read'],
    'addAttendence'    => ['add-attendance', 'attendanceAdd', 'post', 'class.attendance.add'],
    'editAttendence'   => ['edit-attendance', 'attendanceEdit', 'post', 'class.attendance.edit'],
    'deleteAttendence' => ['delete-attendance', 'attendanceDelete', 'post', 'class.attendance.delete'],
    'readSetting'      => ['read-setting', 'settingRead', 'get', 'class.setting.read'],
    'addSetting'       => ['add-setting', 'settingAdd', 'post', 'class.setting.add'],
    'editSetting'      => ['edit-setting', 'settingEdit', 'post', 'class.setting.edit'],
    'deleteSetting'    => ['del-setting/{id}', 'settingDelete', 'post', 'class.setting.delete'],
];
