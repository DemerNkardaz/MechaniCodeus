$(document).ready(function () {
    var accessToken = '';

    function getGitHubCommits(page = 1) {
        var apiUrl = 'https://api.github.com/repos/DemerNkardaz/MechaniCodeus/commits';

        var commitsContainer = $('#commits-container');
        if (commitsContainer.find('tr').length === 0) {
            $.ajax({
                url: apiUrl + `?per_page=100&page=${page}`,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (data) {
                    var totalCommits = data.length;

                    data.forEach(function (commit, i) {
                        var commitMessage = commit.commit.message;
                        var commitAuthor = commit.commit.author.name;
                        var commitFilesUrl = commit.commit.tree.url;
                        var commitDate = commit.commit.author.date;

                        // Сделаем запрос для получения данных о файлах
                        $.ajax({
                            url: commitFilesUrl,
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            },
                            success: function (filesData) {
                                // Получим имена файлов
                                var fileNames = filesData.tree.map(function (file) {
                                    return file.path;
                                });

                                var rowNumber = totalCommits - (page - 1) * 100 - i;

                                var commitRow = '<tr>';
                                commitRow += '<td>' + rowNumber + '</td>';
                                commitRow += '<td>' + commitAuthor + '</td>';
                                commitRow += '<td>' + commitMessage + '</td>';
                                commitRow += '<td>' + commitDate + '</td>';
                                commitRow += '</tr>';
                                commitsContainer.append(commitRow);

                                var filesRow = '<tr class="files-row">';
                                filesRow += '<td colspan="4">' + fileNames.join(', ') + '</td>';
                                filesRow += '</tr>';
                                commitsContainer.append(filesRow);
                            }
                        });
                    });

                    if (data.length === 100) {
                        getGitHubCommits(page + 1);
                    }
                }
            });
        }
    }

    function gitHubCompiled() {
        getGitHubCommits();
        $('#dummyGitBlank').fadeToggle('slow').css('display', 'flex');
    }

    $(document).on('click', '#VersionsInfo', gitHubCompiled);
});
