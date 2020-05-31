<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\library;

/**
 *
 * @author ahmadhajeer
 */
interface FileUploadInt
{

    const WALL_POST_FILE_TYPE           = 'wall_post_image';
    const VIRTUAL_CLASS_POST_IMAGE_TYPE = 'vc_post_image';
    const VIRTUAL_CLASS_FILE_TYPE       = 'vc_file';
    const VIRTUAL_CLASS_HOMEWORK_TYPE   = 'vc_homework_file';
    const PROFILE_AVATAR_TYPE           = 'profile_avatar';
    const PROFILE_BOOKBANK_TYPE         = 'bookbank_file';
    const PROFILE_COVER_TYPE            = 'profile_cover';
    const PROFILE_COVER_FILE_TYPE       = 'profile_cover_file';
    const PROFILE_AVATAR_FILE_TYPE      = 'profile_avatar_file';
    const DOCTOR_CV_FILE_TYPE           = 'doctor_cv';
    const VIRTUAL_CLASS_BOOK_TYPE       = 'vc_book';
    const VIRTUAL_CLASS_SYLLABUS_TYPE   = 'vc_syllabus';
    const GROUP_COVER_TYPE              = 'group_cover';
    const CONTACT_US                    = 'contact';

    const FILE_TYPE_PATH = array(
        self::WALL_POST_FILE_TYPE           => 'upload/posts/images/',
        self::VIRTUAL_CLASS_POST_IMAGE_TYPE => 'upload/posts/images/',
        self::VIRTUAL_CLASS_FILE_TYPE       => 'upload/files/files/',
        self::VIRTUAL_CLASS_HOMEWORK_TYPE   => 'upload/homework/files/',
        self::PROFILE_AVATAR_TYPE           => 'upload/profile/avatar/',
        self::PROFILE_BOOKBANK_TYPE         => 'upload/bookbank/',
        self::PROFILE_COVER_TYPE            => 'upload/profile/cover/',
        self::PROFILE_COVER_FILE_TYPE       => 'upload/profile/cover/',
        self::PROFILE_AVATAR_FILE_TYPE      => 'upload/profile/avatar/',
        self::DOCTOR_CV_FILE_TYPE           => 'upload/files/files/',
        self::VIRTUAL_CLASS_BOOK_TYPE       => 'upload/Vc/Book/',
        self::VIRTUAL_CLASS_SYLLABUS_TYPE   => 'upload/Vc/Syllabus/',
        self::GROUP_COVER_TYPE              => 'upload/group/cover/',
        self::CONTACT_US                    => 'upload/support/file/',
    );
    const FILE_TYPE_VALIDATION = array(
        // if user type is 1
        1 => array(
            self::WALL_POST_FILE_TYPE           => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif,GIF|required|max:4000',
            ),
            self::VIRTUAL_CLASS_POST_IMAGE_TYPE => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif,GIF|required|max:4000',
            ),
            self::PROFILE_AVATAR_TYPE           => array(
                'file' => 'required',
            ),
            self::PROFILE_BOOKBANK_TYPE         => array(
                'file' => 'required',
            ),
            self::PROFILE_COVER_TYPE            => array(
                'file' => 'required',
            ),
            self::DOCTOR_CV_FILE_TYPE           => array(
                'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
            ),
            self::GROUP_COVER_TYPE              => array(
                'file' => 'required',
            ),
            self::PROFILE_COVER_FILE_TYPE       => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif|required|max:4000',
            ),
            self::PROFILE_AVATAR_FILE_TYPE      => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif|required|max:4000',
            ),
            self::CONTACT_US                    => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif|required|max:4000',
            ),
        ),
        // if user type is 2
        2 => array(
            self::WALL_POST_FILE_TYPE           => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif,GIF|required|max:4000',
            ),
            self::VIRTUAL_CLASS_POST_IMAGE_TYPE => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif,GIF|required|max:4000',
            ),
            self::VIRTUAL_CLASS_FILE_TYPE       => array(
                'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
            ),
            self::VIRTUAL_CLASS_HOMEWORK_TYPE   => array(
                'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
            ),
            self::PROFILE_AVATAR_TYPE           => array(
                'file' => 'required',
            ),
            self::PROFILE_BOOKBANK_TYPE         => array(
                'file' => 'required',
            ),
            self::PROFILE_COVER_TYPE            => array(
                'file' => 'required',
            ),
            self::PROFILE_COVER_FILE_TYPE       => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif|required|max:10000',
            ),
            self::PROFILE_AVATAR_FILE_TYPE      => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif|required|max:10000',
            ),
            self::DOCTOR_CV_FILE_TYPE           => array(
                'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
            ),
            self::VIRTUAL_CLASS_SYLLABUS_TYPE   => array(
                'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
            ),
            self::VIRTUAL_CLASS_BOOK_TYPE       => array(
                'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
            ),
            self::GROUP_COVER_TYPE              => array(
                'file' => 'required',
            ),
            self::CONTACT_US                    => array(
                'file' => 'mimes:jpeg,jpg,JPG,png,gif|required|max:4000',
            ),
        ),
    );

    const DEVICE_IMAGE_SIZE = array(
        self::WALL_POST_FILE_TYPE           => array(
            'web'     => '900',
            'android' => '600',
            'IOS'     => '600',
        ),
        self::VIRTUAL_CLASS_POST_IMAGE_TYPE => array(
            'web'     => '900',
            'android' => '600',
            'IOS'     => '600',
        ),

    );

}
