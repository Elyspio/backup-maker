namespace BackupMaker.Api.Abstractions.Common.Assemblers;

/// <summary>
///     Convert an object of <typeparamref name="TA"/> to a <typeparamref name="TB"/>  and inversely
/// </summary>
/// <typeparam name="TA"></typeparam>
/// <typeparam name="TB"></typeparam>
public abstract class BaseAssembler<TA, TB>
{
	/// <summary>
	///     Convert an object of <typeparamref name="TA"/>  to a <typeparamref name="TB"/> 
	/// </summary>
	public abstract TB Convert(TA obj);

	/// <summary>
	///     Convert an object of <typeparamref name="TB"/>  to a <typeparamref name="TA"/> 
	/// </summary>
	public abstract TA Convert(TB obj);


	/// <summary>
	///     Convert a list <typeparamref name="TA"/>  to a list of <typeparamref name="TB"/> 
	/// </summary>
	public IEnumerable<TB> Convert(IEnumerable<TA> objs)
	{
		return objs.Select(Convert).ToList();
	}

	/// <summary>
	///     Convert a enumerable of <typeparamref name="TB"/>  to a enumerable  of <typeparamref name="TA"/> 
	/// </summary>
	public IEnumerable<TA> Convert(IEnumerable<TB> objs)
	{
		return objs.Select(Convert).ToList();
	}

	/// <summary>
	///     Convert a list of <typeparamref name="TA"/>  to a list  of <typeparamref name="TB"/> 
	/// </summary>
	public List<TB> Convert(List<TA> objs)
	{
		return objs.Select(Convert).ToList();
	}


	/// <summary>
	///     Convert a list of <typeparamref name="TB"/>  to a list of <typeparamref name="TA"/> 
	/// </summary>
	public List<TA> Convert(List<TB> objs)
	{
		return objs.Select(Convert).ToList();
	}
}