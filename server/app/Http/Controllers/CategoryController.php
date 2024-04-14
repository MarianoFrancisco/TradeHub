<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getCategoryName($id)
    {
        $categoryName = Category::where('id', $id)->value('name');
        if ($categoryName) {
            return response()->json($categoryName);
        } else {
            return response()->json(['error' => 'No se encontró la categoría'], 404);
        }
    }

    public function getCategoryId($name)
    {
        $categoryId = Category::where('id', $name)->value('id');
        if ($categoryId) {
            return response()->json($categoryId);
        } else {
            return response()->json(['error' => 'No se encontró la categoría'], 404);
        }
    }

    public function getCategory($id)
    {
        $category = Category::where("id", $id)->first();
        return response()->json($category);
    }

    public function getAllCategory()
    {
        $category = Category::all();
        return response()->json($category);
    }
}
