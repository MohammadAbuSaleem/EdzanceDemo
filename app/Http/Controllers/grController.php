<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Classes\Chat;
use App\Http\Controllers\Classes\Groupes;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Social\posts;
use App\Models\friends;
use App\Models\group;
use App\Models\groupuser;
use App\Models\post;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class grController extends Controller
{
    public function getMe()
    {
        $users = group::where('creator', Auth::user()->id)->select('groups.cover',
            'groups.id',
            'groups.name',
            'groups.privacy',
            'groups.created_at',
            'groups.description',
            'groups.id',
            DB::raw("'me' as type"))
            ->with(['user' => function ($query) {
                $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
            }])->take(4)->get();
        return response()->success($users);
    }
    public function getTest($id = 74)
    {
        $u    = Auth::user();
        $tags = [];
        $user = group::find($id);
        foreach ($user->taxonomies as $tag) {
            $tags[] = $tag->id;
        }
        $taxnomy = taxonomy::whereIn('id', $tags)
            ->has('groups')
            ->select('id')
            ->get();
        foreach ($taxnomy as $key => $value) {
            $tags_spec[] = $value->id;
        }
        $user->tags = $tags;
        return response()->success($tags_spec);
    }
    public function getAllMe($skip = 0, $take = 10)
    {
        $user = group::where('creator', Auth::user()->id)->select('groups.cover',
            'groups.name',
            'groups.privacy',
            'groups.created_at',
            'groups.id',
            'groups.description', DB::raw("'me' as type"))
            ->with(['user' => function ($query) {
                $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
            }])->skip($skip)->take($take)->get();
        if (count($user) == 0) {
            return response()->success('no post');
        }
        return response()->success($user);
    }
    public function Entered()
    {
        $user = groupuser::where('user_id', Auth::user()->id)
            ->select('id')->get();
        $invited = array_column($user->toArray(), 'id');
        $mygroup = group::whereIn('id', $invited)->where('creator', '<>', Auth::user()->id)->with(['user' => function ($query) {
            $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
        }])->select('cover',
            'id',
            'name',
            'privacy',
            'created_at',
            'description', DB::raw("'entered' as type"))
            ->take(5)->get();
        return response()->success($mygroup);
    }

    public function AllEntered($skip = 0, $take = 10)
    {
        $last = [];
        $user = groupuser::where('user_id', Auth::user()->id)
            ->select('id')->get();
        $invited = array_column($user->toArray(), 'id');
        $mygroup = group::whereIn('id', $invited)->where('creator', '<>', Auth::user()->id)->with(['user' => function ($query) {
            $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
        }])->select('cover',
            'id',
            'name',
            'privacy',
            'created_at',
            'description', DB::raw("'entered' as type"))
            ->skip($skip)->take($take)->get();
        foreach ($mygroup as $key => $value) {
            if (!is_null($value)) {
                $value['type'] = 'entered';
                $last[]        = $value;
            }
        }
        if (count($last) == 0) {
            return response()->success('no post');
        }
        return response()->success($last);
    }
    public function Suggested()
    {
        $v       = [];
        $u       = Auth::user();
        $mygroup = groupuser::where('user_id', Auth::user()->id)->whereIn('users_groups.type', ['in', 'modirator', 'owner', 'waiting', 'invited', 'blocked'])->get();
        foreach ($mygroup as $key => $value) {
            $v[] = $value->id;
        }
        $suggested = group::where('privacy', '<>', 'closed')
            ->where('institute_id', $u->institute_id)
            ->whereNotIn('id', $v)
            ->select('groups.cover',
                'groups.id',
                'groups.name',
                'groups.privacy',
                'groups.created_at',
                'groups.description', DB::raw("'suggested' as type"))
            ->with(['user' => function ($query) {
                $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
            }])->take(5)->get();
        if (count($suggested) == 0) {
            $suggested = group::where('privacy', '<>', 'closed')->whereNotIn('id', $v)->select('groups.cover',
                'groups.id',
                'groups.name',
                'groups.privacy',
                'groups.created_at',
                'groups.description', DB::raw("'suggested' as type"))
                ->with(['user' => function ($query) {
                    $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
                }])->take(5)->get();
        }
        if (count($suggested) == 0) {
            $suggested = group::where('privacy', 'public')->take(5)->whereNotIn('id', $v)->select('groups.cover',
                'groups.id',
                'groups.name',
                'groups.privacy',
                'groups.created_at',
                'groups.description', DB::raw("'suggested' as type"))
                ->with(['user' => function ($query) {
                    $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
                }])->get();
        }
        return response()->success($suggested);
    }
    public function AllSuggested($skip = 0, $take = 10)
    {
        // dd('BELAL');
        $u       = Auth::user();
        $mygroup = groupuser::where('user_id', Auth::user()->id)->whereIn('users_groups.type', ['in', 'modirator', 'owner', 'waiting', 'invited', 'blocked'])->get();
        foreach ($mygroup as $key => $value) {
            $v[] = $value->id;
        }
        $user = group::where('privacy', '<>', 'closed')->where('institute_id', $u->institute_id)->whereNotIn('id', $v)->select('groups.cover',
            'groups.id',
            'groups.name',
            'groups.privacy',
            'groups.created_at',
            'groups.description', DB::raw("'suggested' as type"))->with(['user' => function ($query) {
            $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
        }])->skip($skip)->take($take)->get();
        if (count($user) == 0) {
            // $university_id = category::find($u->institute_id)->main_parent;
            $user = group::where('privacy', '<>', 'closed')->whereNotIn('id', $v)->select('groups.cover',
                'groups.id',
                'groups.name',
                'groups.privacy',
                'groups.created_at',
                'groups.description', DB::raw("'suggested' as type"))->with(['user' => function ($query) {
                $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
            }])->skip($skip)->take($take)->get();
        }
        if (count($user) == 0) {
            $user = group::where('privacy', 'public')->whereNotIn('id', $v)->skip($skip)->select('groups.cover',
                'groups.id',
                'groups.name',
                'groups.privacy',
                'groups.created_at',
                'groups.description', DB::raw("'suggested' as type"))->with(['user' => function ($query) {
                $query->select('users.avatar', 'users.id', 'users_groups.user_id', 'users_groups.id')->take(5);
            }])->take($take)->get();
        }
        if (count($user) == 0) {
            return response()->success('no post');
        }
        return response()->success($user);
    }

    public function Group($id)
    {
        return response()->success(Groupes::getGroup($id));
    }
    public function GroupUserCount($id)
    {
        return group::where('id', $id)->withCount('user')->first()->user_count + 1;
    }
    public function Users($id, $skip = 0, $take = 10)
    {
        $u          = Auth::user();
        $permission = groupuser::where('user_id', $u->id)->where('id', $id)->first();
        $user       = groupuser::where('users_groups.id', $id)->whereIn('users_groups.type', ['in', 'blocked'])
            ->leftjoin('users as usr', 'usr.id', '=', 'users_groups.user_id')
            ->leftjoin('institutes as inst', 'usr.institute_id', '=', 'inst.id')
            ->select('usr.id',
                'usr.name',
                'usr.mid_name',
                'usr.last_name',
                'usr.created_at',
                'usr.avatar',
                'usr.institute_id',
                'inst.mthr_name as institute',
                'users_groups.type')
            ->skip($skip)->take($take)->get();
        if (count($user) == 0) {
            return response()->success('no post');
        }
        return response()->success($user);
    }
    public function UsersInvites($id, $skip = 0, $take = 10)
    {
        $user    = groupuser::where('users_groups.user_id', $id)->where('users_groups.type', 'invited')->select('id')->get();
        $invited = array_column($user->toArray(), 'id');
        $user    = group::whereIn('id', $invited)->with(['user' => function ($query) {
            $query->take(5);
        }])
            ->select('cover',
                'id',
                'name',
                'privacy',
                'created_at',
                'description', DB::raw("'entered' as type"))->skip($skip)->take($take)->get();
        if (count($user) == 0) {
            return response()->success('no post');
        }
        return response()->success($user);
    }
    public function UsersWaiting($id, $skip = 0, $take = 10)
    {
        $user = groupuser::where('users_groups.id', $id)->where('users_groups.type', 'waiting')
            ->leftjoin('users as usr', 'usr.id', '=', 'users_groups.user_id')
            ->leftjoin('institutes as inst', 'usr.institute_id', '=', 'inst.id')
            ->select('usr.id',
                'usr.name',
                'usr.mid_name',
                'usr.last_name',
                'usr.created_at',
                'usr.avatar',
                'usr.institute_id',
                'inst.mthr_name as institute',
                'users_groups.type')->skip($skip)->take($take)->get();
        if (count($user) == 0) {
            return response()->success('no post');
        }
        return response()->success($user);
    }
    public function Modirator($id, $skip = 0, $take = 10)
    {
        $user = groupuser::where('users_groups.id', $id)->where('users_groups.type', 'modirator')
            ->leftjoin('users as usr', 'usr.id', '=', 'users_groups.user_id')
            ->leftjoin('institutes as inst', 'usr.institute_id', '=', 'inst.id')
            ->select('usr.id',
                'usr.name',
                'usr.mid_name',
                'usr.last_name',
                'usr.created_at',
                'usr.avatar',
                'usr.institute_id',
                'inst.mthr_name as institute',
                'users_groups.type')->skip($skip)->take($take)->get();
        if (count($user) == 0) {
            return response()->success('no Modirator');
        }
        return response()->success($user);
    }
    public function postAddToGroup($id, $user, $param = 0)
    {
        return response()->success(Groupes::Add($id, $user, $param));
    }
    public function AddToGroup($id, $user, $param = 0, Request $r)
    {
        $add            = Groupes::Add($id, $user, $param);
        $suggested_id   = [];
        $suggested_id   = $r->all();
        $suggested_id[] = $user;
        $suggested      = $this->getSuggestedUser($id, 0, 1, true, $suggested_id);
        return response()->success(['add' => $add['post'], 'suggested' => $suggested, 'suggested_ids' => $suggested_id]);
        return ['add' => $add['post'], 'suggested' => $suggested, 'suggested_ids' => $suggested_id];
    }

    public function Video($id, $skip = 0, $take = 10)
    {
        return response()->success((new posts('group', false, 'video', $id))->post->reading($skip, $take)->get());
    }

    public function Images($id, $skip = 0, $take = 10)
    {
        return response()->success((new posts('group', false, 'image', $id))->post->reading($skip, $take)->get());

    }
    public function Post($group, $skip = 0, $take = 10, $id = false)
    {
        return response()->success((new posts('group', $id, '', $group))->post->reading($skip, $take)->get());
    }
    public function postPost(Request $r, $id)
    {
        return response()->success((new posts('group', false, $r->type, $id))->post->adding($r));
    }
    public function postImage(Request $r)
    {
        return response()->success((new posts('group', false, 'image', $r->placeId))->post->adding($r));
    }
    public function SearchUser($group = false, $id = 0)
    {
        $u    = [];
        $user = [];
        if ($group === false || $id === 0) {
            return response()->success(compact('u'));
        }
        $university_id = groupuser::where('id', $group)->select('user_id')->whereNotIn('type', ['out'])->get();
        $group         = group::where('id', $group)->first();
        $user          = array_column($university_id->toArray(), 'user_id');
        $u             = User::select('users.id', 'users.institute_id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS name'), 'users.avatar as img');
        $u->whereRaw("(CONCAT(users.name,' ',users.last_name,' - ' ,users.id ) like '$id%')");
        $u->whereNotIn('users.id', $user);
        $u = $u->take(5)->get();
        if ($u) {
            return response()->success($u);
        } else {
            return response()->success($u);
        }
    }
    public function Addgroup(Request $request)
    {
        if ($user = Auth::user()) {
            $days = [];
            $this->validate($request, [
                'name'       => 'required',
                'permission' => 'required',
                'tags'       => 'required',
            ]);
            DB::beginTransaction();
            try {
                $Chat                           = new Chat(Auth::user()->id, Auth::user()->FB_UID);
                $room                           = $Chat->addNewRoom('', 'group', $request->input('name'), false);
                $type                           = $request->tags;
                $post                           = new group;
                $post->Fire_Base_Chat_Room_name = $room['Rooms'][Auth::user()->FB_UID]['name'];
                $post->name                     = $request->name;
                $post->creator                  = $user->id;
                $post->description              = $request->description;
                $post->privacy                  = $request->permission;
                $post->institute_id             = $user->institute_id;
                $post->authorized               = ($request->auth || 0);
                $post->save();
                $post->cover = "/images/showcase/default.jpg";
                foreach ($type as $key => $value) {
                    if ($tax = taxonomy::where('body', $value['text'])->first()) {
                        $tax->increment('number');
                    } else {
                        $tax         = new taxonomy;
                        $tax->number = 1;
                        $tax->body   = $value['text'];
                        $tax->save();
                    }
                    $gr_tax                = new taggable;
                    $gr_tax->taggable_id   = $post->id;
                    $gr_tax->taxonomy_id   = $tax->id;
                    $gr_tax->taggable_type = 'App\Models\group';
                    $gr_tax->save();
                }
                $groupuser          = new groupuser;
                $groupuser->id      = $post->id;
                $groupuser->user_id = $user->id;
                $groupuser->type    = 'owner';
                $groupuser->save();
            } catch (\Exception $e) {
                DB::rollback();
                throw $e;
            }
            DB::commit();
            return response()->success($post);
        }
    }
    public function postEditgr($id, Request $request)
    {
        $user = Auth::user();
        $type = $request->tags;
        if ($gr = group::find($id)) {
            $taxonomies = group::find($id)->taxonomies;
            if ($user->id == $gr->creator) {
                foreach ($taxonomies as $key => $value) {
                    if ($tax = taxonomy::where('body', $value['text'])->first()) {
                        $tax->decrement('number');
                    }
                    $gr_tax = taggable::where('taxonomy_id', $value->pivot->taxonomy_id)->delete();
                    $gr_tax = taggable::where('taxonomy_id', $value->pivot->taxonomy_id)
                        ->where('taggable_id', $value->pivot->taggable_id)
                        ->where('taggable_type', 'App\group')->delete();
                }
                foreach ($type as $key => $value) {
                    if ($tax = taxonomy::where('body', $value['text'])->first()) {
                        $tax->increment('number');
                    } else {
                        $tax         = new taxonomy;
                        $tax->number = 1;
                        $tax->body   = $value['text'];
                        $tax->save();
                    }
                    $gr_tax                = new taggable;
                    $gr_tax->taggable_id   = $gr->id;
                    $gr_tax->taxonomy_id   = $tax->id;
                    $gr_tax->taggable_type = 'App\Models\group';
                    $gr_tax->save();
                }

                $gr->name        = $request->name;
                $gr->description = $request->description;
                $gr->privacy     = $request->privacy;
                $gr->authorized  = ($request->auth || 0);
                $gr->save();
                $group = group::where('id', $id)->with('taxonomies')->first();
                switch ($group->privacy) {
                    case 'public':
                        $group->privacy_num = 1;
                        break;
                    case 'closed':
                        $group->privacy_num = 2;
                        break;
                    case 'same_institute':
                        $group->privacy_num = 3;
                        break;
                }
                return response()->success(compact('group'));
            } else {
                return response()->error('no permission');
            }
        } else {
            return response()->error('Id erorr !!');
        }
    }
    public function getSuggestedUser($group_id = false, $skip = 0, $take = 4, $suggest = false, $suggested = [])
    {
        $u        = [];
        $user     = [];
        $users_id = [];
        // die('asd');
        if (!$user = Auth::user()) {
            return response()->success(compact('user'));
        }
        if ($group_id === false) {
            return response()->success(compact('u'));
        }
        $group     = group::where('id', $group_id)->with('user')->first();
        $groupuser = groupuser::where('id', $group_id)->whereIn('type', ['in', 'waiting', 'invited', 'modirator', 'owner'])->select('user_id', 'type')->get();
        $users_id  = array_column($groupuser->toArray(), 'user_id');
        $friend    = friends::where('friends.id', $user->id)
            ->whereNotIn('users.id', $users_id)
            ->leftjoin('users', 'users.id', '=', 'friends.friend_id')
            ->leftjoin('users as me', 'me.id', '=', 'friends.id')
            ->leftjoin('categories as spec', 'friends.friend_id', '=', 'spec.id')
            ->leftjoin('categories as uni', 'spec.main_parent', '=', 'uni.id')
            ->select('users.id as user_id',
                'users.institute_id as user_inst',
                'users.name',
                'users.mid_name',
                'users.last_name',
                'users.avatar',
                'friends.id',
                'friends.friend_id',
                'spec.name as specialition',
                'uni.name as university'
            );

        switch ($group->privacy) {
            case 'same_university':
                $friend->whereColumn('users.institute_id', 'me.institute_id');
                break;
        }
        if ($suggested != []) {
            return $friend = $friend->whereNotIn('friends.friend_id', $suggested)->skip(1)->first();
        }
        $friend = $friend->skip($skip)->take($take)->get();
        $ids    = array_column($friend->toArray(), 'user_id');
        return ['suggested_ids' => $ids, 'suggested' => $friend];
    }
    public function delete($id)
    {
        $delete = group::where('id', $id)->delete();
        if ($delete) {
            $data = [
                'result' => 'deleted',
                'sucess' => true];

        } else {
            $data = [
                'result' => 'error',
                'sucess' => false];
        }
        return response()->success($data);
    }

    public function ChangeCover(Request $request)
    {
        $user = Auth::user();
        if ($gr = group::find($request->id)) {
            if ($user->id == $gr->creator) {
                $path      = 'upload/group/cover/' . md5(time()) . $user->id . '.jpg';
                $ii        = Image::make($request->string_file)->encode('jpg')->save(env('UPLOAD_DIRECTORY', '') . $path);
                $gr->cover = $path;
                $gr->save();
                return $path;
            } else {
                return 'not authorized';
            }

        } else {
            return 'erorr in group id';
        }
    }
}
