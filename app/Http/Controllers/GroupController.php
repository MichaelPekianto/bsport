<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GroupController extends Controller
{
    //Dashboard
    public function index()
    {
        $mygroups = DB::table('groups')
                    ->join('group_members','group_members.group_id','=','groups.id')
                    ->where('group_members.user_id',auth()->user()->id)
                    ->get();

        $alluser = User::all();

        return Inertia::render('Dashboard', [
            'mygroups' => $mygroups,
            'users' => $alluser
        ]);
    }

    //Discover
    public function index_discover(){

        $auth_id = auth()->user()->id;

        $alluser = User::all();

        $publicgroups = DB::select(
                            "
                                select g.*
                                from groups g
                                join group_members gm on gm.group_id = g.id
                                where g.id not in
                                (select g.id from groups g join group_members gm on gm.group_id = g.id where gm.user_id = $auth_id)
                            "
                        );

        return Inertia::render('Discover', [
            'publicgroups' => $publicgroups,
            'users' => $alluser
        ]);
    }

}
