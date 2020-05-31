class ProfileAboutController {
    constructor(moment, $stateParams, $scope, $rootScope, API,$http) {
        'ngInject';
        let navSideBar = this
        this.API = API;
        this.rscope = $rootScope;
        this.scope = $scope;
        this.scope.classes = [];
        this.stateParams = $stateParams;
        this.scope.unicountry = [];
        this.scope.daysError = true;
        this.scope.timeError = true;
        this.API.all('profile/countries-list').get('').then((response) => {
        angular.element('html').scrollTop(0);
            for (var i in response.data) {
                $scope.unicountry.push({
                    value: response.data[i].id,
                    text: response.data[i].country_arabic
                });
            }
        });
        $scope.getInstitute = function(val,edu) {
            var instype;
            if(edu.grade == 'school' || edu.grade == 'secondery'){
                instype = 2;
            }else{
                instype = 1;
            }
            return $http.get('../api/inst/search-institute/1/'+val).then(function(response){
                if(response.data.data != "no post"){
                    var obj = response.data.data;
                    return Object.keys(obj).map(function (key) {
                        return {'id':key,'name':obj[key]}; 
                    });
                }
            });
        };
        $scope.getSpecialty = function(val,instId) {
            return $http.get('../api/inst/search-institute/'+instId+'/'+val).then(function(response){
                if(response.data.data != "no post"){
                    var obj = response.data.data;
                    return Object.keys(obj).map(function (key) {
                        return {'id':key,'name':obj[key]}; 
                    });
                }
            });
        };
        $scope.onInsSelect = function(item,key) {
           $scope.dgreeuni[key].instId = item.id;
           $scope.dgreeuni[key].instName = item.name;
        }; 
        $scope.shouldInsSelect = function(event,key) {
            if($scope.dgreeuni[key].instId != ''){
                $scope.dgreeuni[key].instId = '';
            }
        }; 
        $scope.onSpeSelect = function(item,key) {
           $scope.dgreeuni[key].speId = item.id;
           $scope.dgreeuni[key].speName = item.name;
        };  
        $scope.shouldSpeSelect = function(event,key) {
            if($scope.dgreeuni[key].speId != ''){
                $scope.dgreeuni[key].speId = '';
            }
        }; 
        $scope.getCountry = function(id) {
            var data = $scope.unicountry;
            for (var x in data) {
                if (data[x].value == id) {
                    return data[x].text;
                }
            }
        }
        $scope.showGrade = function(data) {
            switch (data) {
                case "school":
                    return "المرحله الاساسية";
                    break;
                case "secondery":
                    return "المرحله الثانوية";
                    break;
                case "diploma":
                    return "دبلوم";
                    break;
                case "bachelor":
                    return "بكالوريوس";
                    break;
                case "master":
                    return "ماجستر";
                    break;
                case "doctorate":
                    return "دكتوراة";
                    break;
                case "assistant-professor":
                    return "استاذ مساعد";
                    break;
                case "co-professor":
                    return "استاذ مشارك";
                    break;
                case "Professor":
                    return "بروفيسور";
                    break;
            }
        }
           $scope.showDays = function(data) {
            switch (data) {
                case "saturday":
                    return "السبت";
                    break;
                case "sunday":
                    return "الاحد";
                    break;
                case "monday":
                    return "الاثنين";
                    break;
                case "tuesday":
                    return "الثلاثاء";
                    break;
                case "wednesday":
                    return "الاربعاء";
                    break;
                case "thursday":
                    return "الخميس";
                    break;
                case "friday":
                    return "الجمعة";
                    break;
            }
        }
        $scope.daysSelected = {
            status: []
        }; 
        this.API.all('profile/cv/' + navSideBar.stateParams.id).get('')
            .then((response) => {
                this.date = response.data.DOB;
                this.scope.acctype = response.data.acctype;
                response.data.DOB = new Date(this.date)
                this.userData = response.data;
                if (response.data.sex == 'male')
                    response.data.sex = 'ذكر';
                if (response.data.sex == 'female')
                    response.data.sex = 'انثى';
                $scope.university_ends = function() {
                    var e = []; 
                    var d = new Date();
                    var n = d.getFullYear();
                    for (var i = n; i >= 1950; i--) {
                        e.push({
                            value: i,
                            text: i
                        })
                    }
                    return e;
                }
                $scope.university_end = $scope.university_ends()
                // var t = this.date.split(/[- :]/);
                var d = new Date(Date.UTC('01', '01', '1940'));
                var date2 = new Date();
                var day = (1000 * 3600 * 24);
                var timeDiff = Math.abs(date2.getTime() - d.getTime());
                var diffDays = Math.ceil((timeDiff / day));
                var age = diffDays / 365;
                var university_start = ((date2.getTime() - (((age * day * 365) - (day * 365 * 18)))) / 365 / day + 1940)
                var school = ((date2.getTime() - (((age * day * 365) - (day * 365 * 5)))) / 365 / day + 1940)
                var timeDiff = Math.abs(date2.getTime() - d.getTime());
                this.scope.student_info = {
                    user_id: response.data.id,
                    country: response.data.university_Country,
                    university_id: '',
                    school: Math.round(school),
                    university_start: university_start,
                    university_end: (university_start + 4),
                    skills: '',
                    concerns: '',
                    hobbies: '',
                    languages: 'ar',
                    status: 1,
                    school_town: response.data.university_country,
                    school_end: Math.round((school + 13))

                }
                if (response.data.student_info == null) {
                    response.data.student_info = this.scope.student_info;
                }

                var d = new Date(this.date);
                var month = ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
                // response.data.DOB=   d.getFullYear() + '-' + month + '-' + d.getDate() ; 
                if(this.date == null){
                    response.data.DOB = new Date('1940/01/01');
                }
                this.scope.inf = {
                    id: response.data.id,
                    name: response.data.name,
                    mid_name: response.data.mid_name,
                    last_name: response.data.last_name,
                    sex: response.data.sex,
                    DOB: response.data.DOB,
                    country: response.data.student_country
                }
                if(response.data.university_start == null){
                    var uni_start = new Date('1940/01/01');
                }else{
                    var uni_start = new Date(response.data.university_start);
                }
                if(response.data.university_end == null){
                    var uni_end = new Date('1940/01/01');
                }else{
                    var uni_end = new Date(response.data.university_end)
                }
                if(response.data.school_end == null){
                    var school_end = new Date('1940/01/01');
                }else{
                    var school_end = new Date(response.data.school_end);
                }
                
                this.scope.uni = {
                    id: response.data.id,
                    university_name: response.data.university_name,
                    college_name: response.data.college_name,
                    specialition_name: response.data.specialition_name,
                    university_id: response.data.university_id,
                    university_start: uni_start.getFullYear(),
                    university_end: uni_end.getFullYear(),
                    university_country: response.data.university_country,
                    specialition_desc: response.data.specialition_desc
                }
                this.scope.dgreeuni = response.data.instructor_education;
                this.scope.freehours = response.data.free_hours;
                if(response.data.available_from != null){
                    this.scope.available_from = new Date(response.data.available_from); 
                }
                if(response.data.available_to != null){
                    this.scope.available_to = new Date(response.data.available_to); 
                }
                this.scope.sec = {
                    id: response.data.id,
                    school: response.data.school,
                    school_town: response.data.school_town,
                    school_end: school_end
                }
                if (response.data.skills != null) {
                    var skills = response.data.skills.split(',')
                    var myskills = [];
                    skills.map(function(item, key) {
                        myskills.push({
                            text: item
                        })
                    })
                } else {
                    myskills = response.data.skills
                }
                if (response.data.hobbies != null) {
                    var hobbies = response.data.hobbies.split(',')
                    var myhobbies = [];
                    hobbies.map(function(item, key) {
                        myhobbies.push({
                            text: item
                        })
                    })
                } else {
                    myhobbies = response.data.hobbies
                }
                if (response.data.concerns != null) {
                    var concerns = response.data.concerns.split(',')
                    var myconcerns = [];
                    concerns.map(function(item, key) {
                        myconcerns.push({
                            text: item
                        })
                    })
                } else {
                    myconcerns = response.data.concerns
                }
                if (response.data.languages != null) {
                    var languages = response.data.languages.split(',')
                    var mylanguages = [];
                    languages.map(function(item, key) {
                        mylanguages.push({
                            text: item
                        })
                    })
                } else {
                    mylanguages = response.data.languages
                }
                this.scope.other = {
                    id: response.data.id,
                    skills: myskills,
                    hobbies: myhobbies,
                    concerns: myconcerns,
                    languages: mylanguages
                }
                this.scope.contact = {
                    id: response.data.id,
                    email: response.data.email,
                    telephone: response.data.telephone,
                    skype: response.data.skype,
                    twitter: response.data.twitter,
                    linkedin: response.data.linkedin,
                    facebook: response.data.facebook
                }
            });
        this.scope.advdays = [
            {id: 'saturday', text: 'السبت'},
            {id: 'sunday', text: 'الاحد'},
            {id: 'monday', text: 'الاثنين'},
            {id: 'tuesday', text: 'الثلاثاء'},
            {id: 'wednesday', text: 'الاربعاء'},
            {id: 'thursday', text: 'الخميس'},
            {id: 'friday', text: 'الجمعة'}
        ]; 
        this.sex = [{
                value: 'ذكر',
                text: 'ذكر'
            },
            {
                value: 'انثى',
                text: 'انثى'
            }
        ];
        this.countries = [{
                value: 'اردني',
                text: 'اردني'
            },
            {
                value: 'فلسطيني',
                text: 'فلسطيني'
            },
            {
                value: 'عراقي',
                text: 'عراقي'
            },
            {
                value: 'سوري',
                text: 'سوري'
            },
            {
                value: 'لبناني',
                text: 'لبناني'
            },
            {
                value: 'سعودي',
                text: 'سعودي'
            },
            {
                value: 'كويتي',
                text: 'كويتي'
            },
            {
                value: 'قطري',
                text: 'قطري'
            },
            {
                value: 'بحريني',
                text: 'بحريني'
            },
            {
                value: 'مصري',
                text: 'مصري'
            },
            {
                value: 'اماراتي',
                text: 'اماراتي'
            },
            {
                value: 'عماني',
                text: 'عماني'
            },
            {
                value: 'يمني',
                text: 'يمني'
            },
            {
                value: 'سوداني',
                text: 'سوداني'
            },
            {
                value: 'ليبي',
                text: 'ليبي'
            },
            {
                value: 'جزائري',
                text: 'جزائري'
            },
            {
                value: 'تونسي',
                text: 'تونسي'
            },
            {
                value: 'مغربي',
                text: 'مغربي'
            },
            {
                value: 'صومالي',
                text: 'صومالي'
            },
            {
                value: 'موريتاني',
                text: 'موريتاني'
            },
            {
                value: 'جيبوتي',
                text: 'جيبوتي'
            }
        ];
        this.scope.grade = [
            {
                value: "school",
                text: "المرحله الاساسية"
            },
            {
                value: "secondery",
                text: "المرحله الثانوية"
            },
            {
                value: "diploma",
                text: "دبلوم"
            },
            {
                value: "bachelor",
                text: "بكالوريوس"
            },
            {
                value: "master",
                text: "ماجستر"
            },
            {
                value: "doctorate",
                text: "دكتوراة"
            },
            {
                value: "assistant-professor",
                text: "استاذ مساعد"
            },
            {
                value: "co-professor",
                text: "استاذ مشارك"
            },
            {
                value: "professor",
                text: "بروفيسور"
            }
        ];
    }
    editableForm() {
        var endsex = '';
        var bd;
        if (this.scope.inf.sex == 'ذكر')
            endsex = 'male'
        if (this.scope.inf.sex == 'انثى')
            endsex = 'female'
        if(this.scope.inf.DOB == null){
            this.scope.inf.DOB = 1940;
            bd = null;
        } else if(this.scope.inf.DOB.getFullYear() == 1940){
            this.scope.inf.DOB = 1940;
            bd = null;
        } else {
            bd = this.scope.inf.DOB;
        }
        //console.log(this.scope.inf.DOB);
        var data = {
            id: this.scope.inf.id,
            country: this.scope.inf.country,
            name: this.scope.inf.name,
            DOB: bd,
            sex: endsex,
            last_name: this.scope.inf.last_name,
            mid_name: this.scope.inf.mid_name,
        };
        this.API.all('profile/inf').post(data).then((response) => {
            if (response.data.user.sex == 'male')
                response.data.user.sex = 'ذكر'
            if (response.data.user.sex == 'female')
                response.data.user.sex = 'انثى'
            var d = new Date(response.data.user.DOB)
            this.rscope.prodata.name = this.scope.inf.name + ' ' + this.scope.inf.mid_name + ' ' + this.scope.inf.last_name;
            this.scope.inf.DOB = d;
        }, (response) => {});
    }
    UniversityInf() {
        var data = {
            school: this.scope.sec.school,
            school_town: this.scope.sec.school_town,
            school_end: this.scope.sec.school_end
        };
        this.API.all('profile/sec').post(data).then((response) => {
            //console.log(response.data.student_info.school_end); 
            var d = new Date(response.data.student_info.school_end)
            this.scope.sec.school_end = d;
        }, (response) => {});
    }
    SocialForm() {
        var data = {
            university_name: this.scope.uni.university_name,
            college_name: this.scope.uni.college_name,
            specialition_name: this.scope.uni.specialition_name,
            university_id: this.scope.uni.university_id,
            university_start: this.scope.uni.university_start,
            university_end: this.scope.uni.university_end,
            university_country: this.scope.uni.university_country,
            specialition_desc: this.scope.uni.specialition_desc
        };
        var self = this;
        this.API.all('profile/uni').post(data).then((response) => {
            var university_start = new Date(response.data.student_info.university_start);
            var university_end = new Date(response.data.student_info.university_end);
            self.scope.uni.university_id = response.data.student_info.university_id;
            self.scope.uni.specialition_desc = response.data.student_info.specialition_desc;
            self.scope.uni.university_start = university_end_start;
            self.scope.uni.university_end = university_end;
        });
    }
    UnvForm() {
        var data = {
            university_name: this.scope.uni.university_name,
            college_name: this.scope.uni.college_name,
            specialition_name: this.scope.uni.specialition_name,
            university_id: this.scope.uni.university_id,
            university_start: this.scope.uni.university_start,
            university_end: this.scope.uni.university_end,
            university_country: this.scope.uni.university_country,
            specialition_desc: this.scope.uni.specialition_desc
        };
        this.API.all('profile/uni').post(data).then((response) => {
            var university_start = new Date(response.data.university_start)
            var university_end = new Date(response.data.university_end)
            this.scope.uni.university_id = response.data.university_id
            this.scope.uni.specialition_desc = response.data.specialition_desc
            this.scope.uni.university_start = university_end_start
            this.scope.uni.university_end = university_end
        }, (response) => {

        });
    }
    PublicInf() {
        var myskills = [];
        var myhobbies = [];
        var myconcerns = [];
        var mylanguages = [];
        if (this.scope.other.skills != null) {
            this.scope.other.skills.map(function(item, key) {
                myskills.push(item.text)
            })
            myskills = myskills.join(',');
        } else {
            myskills = this.scope.other.skills
        }
        if (this.scope.other.hobbies != null) {
            this.scope.other.hobbies.map(function(item, key) {
                myhobbies.push(item.text)
            })
            myhobbies = myhobbies.join(',');
        } else {
            myhobbies = this.scope.other.hobbies
        }
        if (this.scope.other.concerns != null) {
            this.scope.other.concerns.map(function(item, key) {
                myconcerns.push(item.text)
            })
            myconcerns = myconcerns.join(',');
        } else {
            myconcerns = this.scope.other.concerns
        }
        if (this.scope.other.languages != null) {
            this.scope.other.languages.map(function(item, key) {
                mylanguages.push(item.text)
            })
            mylanguages = mylanguages.join(',');
        } else {
            mylanguages = this.scope.other.languages
        }
        var data = {
            skills: myskills,
            concerns: myconcerns,
            hobbies: myhobbies,
            languages: mylanguages,
        };
        this.API.all('profile/other').post(data).then((response) => {}, (response) => {});
    }
    ConnectionStatus() {
        var data = {
            email: this.scope.contact.email,
            telephone: this.scope.contact.telephone,
            skype: this.scope.contact.skype,
            twitter: this.scope.contact.twitter,
            linkedin: this.scope.contact.linkedin,
            facebook: this.scope.contact.facebook,
        };
        this.API.all('profile/contact').post(data).then((response) => {}, (response) => {});
    }
    getNumber(num) {
        return new Array(num).map(function(item, key) {
            return item = {
                value: item,
                text: item
            };
        });
    }
    addGrade(form) {
        var data = {
            id: '',
            user_id: this.stateParams.id,
            grade: 'school',
            speId: '',
            speName: '',
            instId:'',
            instName: '',
            country_id: 14,
            start_year: 2016,
            end_year: 2017,
            country_name: '',
            open_edit:1
        };
        this.scope.dgreeuni.push(data);
    }
    saveGrade(self, id) {
        // console.log(self);
        self['id'] = id;
        if (id == '') {
            this.API.all('profile/add-instructor-education').post(self).then((response) => {});
        } else {
            this.API.all('profile/update-instructor-education').post(self).then((response) => {});
        }
    }
    removeGrade(index, id) {
        var data = {
            'id': id
        }
        if (id == '') {
            this.scope.dgreeuni.splice(index, 1);
        } else {
            this.API.all('profile/delete-instructor-education').post(data).then((response) => {
                this.scope.dgreeuni.splice(index, 1);
            });
        }
    }
    closeGrade() {
        for (var i in this.scope.dgreeuni) {
            if (this.scope.dgreeuni[i].id == '') {
                this.scope.dgreeuni.splice(i, 1);
            }
        }
    }
    avaTime(from,to,data,index) {
        if(data.length == 0){
            this.scope.daysError = true;
            this.scope.freehours.splice(index, 1);
        }else if(from == undefined || to == undefined){
            this.scope.timeError = true;
            this.scope.freehours.splice(index, 1);
        } else {
            this.scope.daysError = false;
            this.scope.timeError = false;
            var days = [];
            for (var i in data){
                days[i] = data[i].id;
            }
            // var fromhours = from.getHours();
            // var fromminutes = from.getMinutes();
            // //var fromAmpm = fromhours >= 12 ? 'pm' : 'am';
            // //fromhours = fromhours % 12; 
            // fromhours = fromhours ? fromhours : 12;
            // fromhours = fromhours < 10 ? '0' + fromhours : fromhours;
            // fromminutes = fromminutes < 10 ? '0' + fromminutes : fromminutes;
            // var ftime = fromhours + ':' + fromminutes + ':00';
            // var fromTime = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate() + " " + ftime;

            // var tohours = to.getHours();
            // var tominutes = to.getMinutes();
            // //var toAmpm = tohours >= 12 ? 'pm' : 'am';
            // //tohours = tohours % 12;
            // tohours = tohours ? tohours : 12;
            // tohours = tohours < 10 ? '0' + tohours : tohours;
            // tominutes = tominutes < 10 ? '0' + tominutes : tominutes;
            // var ttime = tohours + ':' + tominutes + ':00';
            // var toTime = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate() +" " + ttime;
            
            //var fromd = new Date(fromTime);
            //var tod = new Date(toTime);

            var time = {  
                days: days,
                from_hour: from/1000,
                to_hour: to/1000
            };
            self = this;
            this.API.all('profile/add-instructor-free-Hours').post(time).then((response) => {
                time.id = response.data.id;
                self.scope.freehours[index] = time;
            }); 
        }
    }
    toDate($date){
        var a =new Date($date);
        var datehours = a.getHours();
        var dateMinutes = a.getMinutes();
        var dateAmpm = datehours >= 12 ? 'pm' : 'am';
        datehours = datehours % 12;
        datehours = datehours == 0 ? 12 : datehours;

       return datehours+':'+dateMinutes+' '+dateAmpm;
    }
    from_changed (from) {
        this.scope.available_from.setHours(from.getHours());
        this.scope.available_from.setMinutes( from.getMinutes());
    };
     getFrom () {
        return this.scope.available_from;
    };
    to_changed (to) {
        this.scope.available_to.setHours(to.getHours() );
        this.scope.available_to.setMinutes( to.getMinutes() );
    };
    addTime(form) {
        var data = {
            id: '',
            from_hour: '',
            to_hour: '',
            days: [],
            edit_hour:1
        };
        this.scope.freehours.push(data);
    }
    removeTime(index, id) {
        var data = {
            'id': id
        }
        if (id == '') {
            this.scope.freehours.splice(index, 1);
        } else {
            this.API.all('profile/delete-free-hours').post(data).then((response) => {
                this.scope.freehours.splice(index, 1);
            });
        }
    }
    $onInit() {}
}

export const ProfileAboutComponent = {
    templateUrl: './views/app/components/profile-about/profile-about.component.html',
    controller: ProfileAboutController,
    controllerAs: 'proab',
    bindings: {}
}