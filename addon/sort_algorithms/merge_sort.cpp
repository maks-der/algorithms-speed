#include <node_api.h>
#include "sort_algorithms.h"
#include <vector>
#include "../helpers/helpers.h"

namespace addon
{
    void merge(std::vector<int> &arr, int left, int mid, int right);
    void mergeSort(std::vector<int> &arr, int left, int right);

    napi_value merge_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        int n = elements.size();

        mergeSort(elements, 0, n - 1);

        return convert_to_napi_array(env, elements);
    }

    void merge(std::vector<int> &arr, int left, int mid, int right)
    {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temporary arrays
        std::vector<int> L(n1);
        std::vector<int> R(n2);

        // Copy data to temporary arrays L[] and R[]
        for (int i = 0; i < n1; ++i)
            L[i] = arr[left + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[mid + 1 + j];

        // Merge the temporary arrays back into arr[left..right]
        int i = 0;    // Initial index of first subarray
        int j = 0;    // Initial index of second subarray
        int k = left; // Initial index of merged subarray

        while (i < n1 && j < n2)
        {
            if (L[i] <= R[j])
            {
                arr[k] = L[i];
                ++i;
            }
            else
            {
                arr[k] = R[j];
                ++j;
            }
            ++k;
        }

        // Copy the remaining elements of L[], if any
        while (i < n1)
        {
            arr[k] = L[i];
            ++i;
            ++k;
        }

        // Copy the remaining elements of R[], if any
        while (j < n2)
        {
            arr[k] = R[j];
            ++j;
            ++k;
        }
    }

    // TODO: refactor names
    void mergeSort(std::vector<int> &arr, int left, int right)
    {
        if (left < right)
        {
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
}