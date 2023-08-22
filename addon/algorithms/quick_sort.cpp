#include <node_api.h>
#include "algorithms.h"
#include <vector>
#include "../helpers/helpers.h"

using namespace std;

namespace addon
{
    int partition(std::vector<int> &arr, int low, int high);
    void quickSort(std::vector<int> &arr, int low, int high);

    napi_value quick_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        int n = elements.size();
        quickSort(elements, 0, n - 1);

        return convert_to_napi_array(env, elements);
    }

    int partition(std::vector<int> &arr, int low, int high)
    {
        int pivot = arr[high]; // Choose the last element as the pivot
        int i = (low - 1);     // Index of smaller element

        for (int j = low; j <= high - 1; ++j)
        {
            // If the current element is smaller than or equal to the pivot
            if (arr[j] <= pivot)
            {
                ++i; // Increment index of smaller element
                std::swap(arr[i], arr[j]);
            }
        }

        std::swap(arr[i + 1], arr[high]);
        return (i + 1);
    }

    // TODO: refactor names
    void quickSort(std::vector<int> &arr, int low, int high)
    {
        if (low < high)
        {
            // Partition the array into two subarrays using a pivot element
            int pivotIndex = partition(arr, low, high);

            // Recursively sort the subarrays
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
}