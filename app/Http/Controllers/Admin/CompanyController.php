<?php

namespace App\Http\Controllers\Admin;

use App\Company;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $companies = Company::all()->toArray();
        $companyCount = Company::all()->count();
        $result['companies'] = $companies;
        $result['companyCount'] = $companyCount;
        return response()->json($result, 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $result['success'] = false;

        $validation = Validator::make($request->all(), [
            'phone1' => ['required', 'unique:companies'],
            'email' => ['required', 'unique:companies'],
            'description' => ['required'],
            'address' => ['required'],
            'location' => ['required'],
            'startTimeWork' => ['required'],
            'endTimeWork' => ['required'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        if (!empty($request->phone2))
        {
            $validation = Validator::make($request->all(), [
                'phone2' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        if (!empty($request->phone3))
        {
            $validation = Validator::make($request->all(), [
                'phone3' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        if (!empty($request->phone4))
        {
            $validation = Validator::make($request->all(), [
                'phone4' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        if (!empty($request->phone5))
        {
            $validation = Validator::make($request->all(), [
                'phone5' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        $company = new Company();
        $company->description = $request->description;
        $company->phone1 = $request->phone1;
        $company->phone2 = $request->phone2;
        $company->phone3 = $request->phone3;
        $company->phone4 = $request->phone4;
        $company->phone5 = $request->phone5;
        $company->email = $request->email;
        $company->address = $request->address;
        $company->location = $request->location;
        $company->startTimeWork = $request->startTimeWork;
        $company->endTimeWork = $request->endTimeWork;
        $company->save();
        if ($company)
        {
            $result['success'] = true;
            $result['message'] = 'Контактные данные компании успешно добавлены';
            return response()->json($result, 201);
        }

    }

    public function show($id)
    {
        $result['success'] = true;
        $company = Company::find($id);
        $result['company'] = $company;
        return response()->json($result, 200);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'phone1' => ['unique:companies'],
            'email' => ['unique:companies'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        if (!empty($request->phone2))
        {
            $validation = Validator::make($request->all(), [
                'phone2' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        if (!empty($request->phone3))
        {
            $validation = Validator::make($request->all(), [
                'phone3' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        if (!empty($request->phone4))
        {
            $validation = Validator::make($request->all(), [
                'phone4' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        if (!empty($request->phone5))
        {
            $validation = Validator::make($request->all(), [
                'phone5' => ['unique:companies'],
            ]);
            if ($validation->fails())
            {
                $result['success'] = false;
                $result['error'] = $validation->errors();
                return response()->json($result, 422);
            }
        }
        $company = Company::find($id);
        $company->description = $request->description ?? $company->description;
        $company->phone1 = $request->phone1 ?? $company->phone1;
        $company->phone2 = $request->phone2 ?? $company->phone2;
        $company->phone3 = $request->phone3 ?? $company->phone3;
        $company->phone4 = $request->phone4 ?? $company->phone4;
        $company->phone5 = $request->phone5 ?? $company->phone5;
        $company->email = $request->email ?? $company->email;
        $company->address = $request->address ?? $company->address;
        $company->location = $request->location ?? $company->location;
        $company->startTimeWork = $request->startTimeWork ?? $company->startTimeWork;
        $company->endTimeWork = $request->endTimeWork ?? $company->endTimeWork;
        $company->save();
        if ($company)
        {
            $result['success'] = true;
            $result['message'] = 'Сведения о компании успешно изменены';
            return response()->json($result, 200);
        }
    }

    public function destroy($id)
    {
        $result['success'] = false;
        $company = Company::find($id);
        $company->delete();
        if ($company->delete())
        {
            $result['success'] = true;
            $result['message'] = 'Компания успешно удалена';
            return response()->json($result, 204);
        }
    }
}
