// this is all jquery syntax!!

$("#add_user").submit(function(event) {
    alert("Data Inserted Successfully!");
})


// acessing the id name "update_user" from the update.ejs file,the form present in that has the id named as update_user!

// i wanna change the default behaviour of the form is to reload the browser when one clicks on submit button,but preventDefault() will prevet that!


// serializeArray() will make sure that the data of the form gets stored in form of an Array,i.e what eva are the previous values of the form,those all get stored in this Serialised array,its like a list of objects!!!


$("#update_user").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    // asynchronously keep updating and transfering the data,once it is done,send a response to the server that hey,i'm done,you give this alert request,while i'm running in background,i want you {server} to keep performing various actions!!,not wait for me!,once i'm done,i'll send you the response!!


    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})

// deleting an user!


if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}